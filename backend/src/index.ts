import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Wallet } from "ethers";
import { getDb, many, one, openDb, run } from "./db";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const CATALOG = [
  { id: 1, name: "Lexi, Word Mage", type: "character", rarity: "legendary", priceSwd: 120 },
  { id: 2, name: "Cipher Fox", type: "character", rarity: "epic", priceSwd: 75 },
  { id: 3, name: "Glyph Frame", type: "avatar", rarity: "rare", priceSwd: 40 },
  { id: 4, name: "Neon Badge", type: "avatar", rarity: "uncommon", priceSwd: 18 },
  { id: 5, name: "Hint Spark", type: "power-up", rarity: "common", priceSwd: 8 },
  { id: 6, name: "Time Crystal", type: "power-up", rarity: "common", priceSwd: 10 },
  { id: 7, name: "Vowel Vault", type: "letter-pack", rarity: "rare", priceSwd: 22 },
  { id: 8, name: "Consonant Crate", type: "letter-pack", rarity: "rare", priceSwd: 22 },
  { id: 9, name: "Golden Quill", type: "special", rarity: "legendary", priceSwd: 200 },
];

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.get("/api/catalog", (_req, res) => res.json({ items: CATALOG }));

app.post("/api/players", (req, res) => {
  const { playerId, wallet } = req.body as { playerId?: string; wallet?: string };
  if (!playerId) return res.status(400).json({ error: "playerId required" });
  const existing = one<{ player_id: string }>("SELECT player_id FROM players WHERE player_id = ?", [playerId]);
  if (!existing) {
    run("INSERT INTO players (player_id, wallet) VALUES (?, ?)", [playerId, wallet || null]);
  } else if (wallet) {
    run("UPDATE players SET wallet = ? WHERE player_id = ?", [wallet, playerId]);
  }
  res.json(playerSnapshot(playerId));
});

app.get("/api/players/:id", (req, res) => {
  const player = playerSnapshot(req.params.id);
  if (!player) return res.status(404).json({ error: "not found" });
  res.json(player);
});

app.post("/api/games", (req, res) => {
  const body = req.body as {
    playerId: string;
    id: string;
    level: number;
    stage: number;
    mode: string;
    score: number;
    swd: number;
    words: string[];
    duration: number;
    completed: boolean;
    createdAt: string;
  };
  if (!body?.playerId || !body.id) return res.status(400).json({ error: "invalid game" });
  if (!one("SELECT player_id FROM players WHERE player_id = ?", [body.playerId])) {
    run("INSERT INTO players (player_id) VALUES (?)", [body.playerId]);
  }
  run(
    `INSERT OR REPLACE INTO games
     (id, player_id, level, stage, mode, score, swd, words, duration, completed, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      body.id,
      body.playerId,
      body.level,
      body.stage,
      body.mode,
      body.score,
      body.swd,
      JSON.stringify(body.words || []),
      body.duration,
      body.completed ? 1 : 0,
      body.createdAt,
    ]
  );
  if (body.swd > 0 && body.completed) {
    run(
      "UPDATE players SET pending_swd = pending_swd + ?, total_earned = total_earned + ?, total_score = total_score + ? WHERE player_id = ?",
      [body.swd, body.swd, body.score, body.playerId]
    );
  } else {
    run("UPDATE players SET total_score = total_score + ? WHERE player_id = ?", [body.score, body.playerId]);
  }
  const player = playerSnapshot(body.playerId);
  res.json({ ok: true, pendingSwd: player?.pendingSwd || 0 });
});

app.get("/api/games", (req, res) => {
  const playerId = String(req.query.playerId || "");
  const rows = many<{
    id: string;
    level: number;
    stage: number;
    mode: string;
    score: number;
    swd: number;
    words: string;
    duration: number;
    completed: number;
    created_at: string;
  }>("SELECT * FROM games WHERE player_id = ? ORDER BY created_at DESC LIMIT 50", [playerId]);
  res.json({
    games: rows.map((row) => ({
      id: row.id,
      level: row.level,
      stage: row.stage,
      mode: row.mode,
      score: row.score,
      swd: row.swd,
      words: JSON.parse(row.words || "[]"),
      duration: row.duration,
      completed: Boolean(row.completed),
      createdAt: row.created_at,
    })),
  });
});

app.get("/api/leaderboard", (req, res) => {
  const period = String(req.query.period || "all");
  const cutoff =
    period === "daily"
      ? Date.now() - 24 * 60 * 60 * 1000
      : period === "weekly"
      ? Date.now() - 7 * 24 * 60 * 60 * 1000
      : 0;
  const rows = many<{ player_id: string; wallet: string | null; score: number; swd: number }>(
    `SELECT g.player_id, p.wallet, SUM(g.score) as score, SUM(g.swd) as swd
     FROM games g LEFT JOIN players p ON p.player_id = g.player_id
     WHERE g.completed = 1 AND (? = 0 OR g.created_at >= ?)
     GROUP BY g.player_id
     ORDER BY score DESC
     LIMIT 25`,
    [cutoff, cutoff ? new Date(cutoff).toISOString() : ""]
  );
  res.json({
    entries: rows.map((row, index) => ({
      rank: index + 1,
      playerId: row.player_id,
      wallet: row.wallet,
      score: Number(row.score || 0),
      swd: Number(row.swd || 0),
    })),
  });
});

app.post("/api/withdraw/prepare", async (req, res) => {
  const { playerId, wallet } = req.body as { playerId?: string; wallet?: string };
  const player = one<{ pending_swd: number }>("SELECT pending_swd FROM players WHERE player_id = ?", [playerId || ""]);
  if (!player || !wallet) return res.status(400).json({ error: "player and wallet required" });
  if (player.pending_swd <= 0) return res.status(400).json({ error: "nothing to withdraw" });
  const key = process.env.REWARD_SIGNER_KEY;
  const vault = process.env.VAULT_ADDRESS;
  if (!key || !vault) {
    return res.status(503).json({ error: "Reward signer is not configured. Deploy RewardVault first." });
  }
  const amountWei = BigInt(Math.floor(player.pending_swd * 1e18)).toString();
  const nonce = Date.now().toString();
  const deadline = Math.floor(Date.now() / 1000) + 20 * 60;
  const signer = new Wallet(key);
  const domain = {
    name: "SmartWordRewards",
    version: "1",
    chainId: Number(process.env.CHAIN_ID || 11142220),
    verifyingContract: vault,
  };
  const types = {
    Claim: [
      { name: "player", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ],
  };
  const signature = await signer.signTypedData(domain, types, {
    player: wallet,
    amount: amountWei,
    nonce,
    deadline,
  });
  run(
    "INSERT INTO txs (id, player_id, kind, hash, amount, status, nonce, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [`prep-${nonce}`, playerId, "withdraw", null, player.pending_swd, "pending", nonce, new Date().toISOString()]
  );
  res.json({ amount: amountWei, nonce, deadline: String(deadline), signature, vault });
});

app.post("/api/withdraw/confirm", (req, res) => {
  const { playerId, nonce, txHash, amount } = req.body as {
    playerId?: string;
    nonce?: string;
    txHash?: string;
    amount?: number;
  };
  if (!playerId || !nonce) return res.status(400).json({ error: "invalid confirm" });
  run("UPDATE txs SET hash = ?, status = ? WHERE nonce = ? AND player_id = ?", [
    txHash || "",
    "confirmed",
    nonce,
    playerId,
  ]);
  run(
    "UPDATE players SET pending_swd = 0, withdrawn_swd = withdrawn_swd + ? WHERE player_id = ?",
    [amount || 0, playerId]
  );
  res.json({ ok: true });
});

app.get("/api/txs", (req, res) => {
  const playerId = String(req.query.playerId || "");
  const rows = many<{
    id: string;
    kind: string;
    hash: string | null;
    amount: number;
    status: string;
    created_at: string;
  }>("SELECT * FROM txs WHERE player_id = ? ORDER BY created_at DESC LIMIT 30", [playerId]);
  res.json({
    txs: rows.map((row) => ({
      id: row.id,
      kind: row.kind,
      hash: row.hash,
      amount: row.amount,
      status: row.status,
      createdAt: row.created_at,
    })),
  });
});

function playerSnapshot(playerId: string) {
  const row = one<{
    player_id: string;
    wallet: string | null;
    pending_swd: number;
    total_earned: number;
    total_score: number;
    withdrawn_swd: number;
  }>("SELECT * FROM players WHERE player_id = ?", [playerId]);
  if (!row) return null;
  return {
    playerId: row.player_id,
    wallet: row.wallet,
    pendingSwd: Number(row.pending_swd || 0),
    totalEarned: Number(row.total_earned || 0),
    totalScore: Number(row.total_score || 0),
    withdrawnSwd: Number(row.withdrawn_swd || 0),
  };
}

async function main() {
  await openDb();
  getDb();
  const port = Number(process.env.PORT || 4000);
  app.listen(port, () => console.log(`SmartWord API on :${port}`));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
