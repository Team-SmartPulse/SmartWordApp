import type { NextApiRequest, NextApiResponse } from "next";
import { playerOf, readStore, writeStore } from "../../lib/serverStore";
import { GAME_ITEMS } from "../../lib/catalog";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = (req.query.slug as string[] | undefined) || [];
  const route = slug.join("/");
  const store = readStore();

  if (route === "health") return res.json({ ok: true, via: "next-api" });
  if (route === "catalog") return res.json({ items: GAME_ITEMS });

  if (route === "players" && req.method === "POST") {
    const { playerId, wallet } = req.body || {};
    if (!playerId) return res.status(400).json({ error: "playerId required" });
    const player = playerOf(store, playerId);
    if (wallet) player.wallet = wallet;
    writeStore(store);
    return res.json(player);
  }

  if (route.startsWith("players/") && req.method === "GET") {
    const id = route.slice("players/".length);
    const player = store.players[id];
    if (!player) return res.status(404).json({ error: "not found" });
    return res.json(player);
  }

  if (route === "games" && req.method === "POST") {
    const body = req.body || {};
    if (!body.playerId || !body.id) return res.status(400).json({ error: "invalid game" });
    const player = playerOf(store, body.playerId);
    store.games = [body, ...store.games.filter((game) => game.id !== body.id)].slice(0, 200);
    player.totalScore += Number(body.score || 0);
    if (body.completed && body.swd > 0) {
      player.pendingSwd += Number(body.swd);
      player.totalEarned += Number(body.swd);
    }
    writeStore(store);
    return res.json({ ok: true, pendingSwd: player.pendingSwd });
  }

  if (route === "games" && req.method === "GET") {
    const playerId = String(req.query.playerId || "");
    return res.json({ games: store.games.filter((game) => game.playerId === playerId).slice(0, 50) });
  }

  if (route === "leaderboard") {
    const period = String(req.query.period || "all");
    const cutoff =
      period === "daily"
        ? Date.now() - 86400000
        : period === "weekly"
        ? Date.now() - 7 * 86400000
        : 0;
    const totals = new Map<string, { score: number; swd: number }>();
    for (const game of store.games) {
      if (!game.completed) continue;
      if (cutoff && new Date(game.createdAt).getTime() < cutoff) continue;
      const current = totals.get(game.playerId) || { score: 0, swd: 0 };
      current.score += Number(game.score || 0);
      current.swd += Number(game.swd || 0);
      totals.set(game.playerId, current);
    }
    const entries = [...totals.entries()]
      .sort((a, b) => b[1].score - a[1].score)
      .slice(0, 25)
      .map(([playerId, value], index) => ({
        rank: index + 1,
        playerId,
        wallet: store.players[playerId]?.wallet || null,
        score: value.score,
        swd: value.swd,
      }));
    return res.json({ entries });
  }

  if (route === "withdraw/prepare" && req.method === "POST") {
    return res.status(503).json({
      error: "Start the RewardVault signer API (backend/) after deploying contracts to withdraw SWD on-chain.",
    });
  }

  if (route === "withdraw/confirm" && req.method === "POST") {
    const { playerId, nonce, txHash, amount } = req.body || {};
    if (!playerId) return res.status(400).json({ error: "invalid confirm" });
    const player = playerOf(store, playerId);
    player.withdrawnSwd += Number(amount || player.pendingSwd);
    player.pendingSwd = 0;
    store.txs.unshift({
      id: `confirm-${nonce || Date.now()}`,
      playerId,
      kind: "withdraw",
      hash: txHash || null,
      amount: Number(amount || 0),
      status: "confirmed",
      createdAt: new Date().toISOString(),
    });
    writeStore(store);
    return res.json({ ok: true });
  }

  if (route === "txs") {
    const playerId = String(req.query.playerId || "");
    return res.json({ txs: store.txs.filter((tx) => tx.playerId === playerId) });
  }

  res.status(404).json({ error: "unknown api route" });
}
