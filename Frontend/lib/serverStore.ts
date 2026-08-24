import fs from "fs";
import path from "path";

export type Store = {
  players: Record<
    string,
    { playerId: string; wallet: string | null; pendingSwd: number; totalEarned: number; totalScore: number; withdrawnSwd: number }
  >;
  games: {
    id: string;
    playerId: string;
    level: number;
    stage: number;
    mode: string;
    score: number;
    swd: number;
    words: string[];
    duration: number;
    completed: boolean;
    createdAt: string;
  }[];
  txs: {
    id: string;
    playerId: string;
    kind: string;
    hash: string | null;
    amount: number;
    status: string;
    nonce?: string;
    createdAt: string;
  }[];
};

const FILE = path.join(process.cwd(), ".data", "smartword.json");

export function readStore(): Store {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8")) as Store;
  } catch {
    return { players: {}, games: [], txs: [] };
  }
}

export function writeStore(store: Store) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(store, null, 2));
}

export function playerOf(store: Store, playerId: string) {
  if (!store.players[playerId]) {
    store.players[playerId] = {
      playerId,
      wallet: null,
      pendingSwd: 0,
      totalEarned: 0,
      totalScore: 0,
      withdrawnSwd: 0,
    };
  }
  return store.players[playerId];
}
