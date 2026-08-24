import { GameRecord, getPlayerId } from "./game";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";

async function request<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export type PlayerSnapshot = {
  playerId: string;
  wallet: string | null;
  pendingSwd: number;
  totalEarned: number;
  totalScore: number;
  withdrawnSwd: number;
};

export async function syncPlayer(wallet?: string) {
  return request<PlayerSnapshot>("/players", {
    method: "POST",
    body: JSON.stringify({ playerId: getPlayerId(), wallet }),
  });
}

export async function fetchPlayer() {
  const id = getPlayerId();
  return request<PlayerSnapshot>(`/players/${id}`);
}

export async function submitGame(record: GameRecord) {
  return request<{ ok: boolean; pendingSwd: number }>("/games", {
    method: "POST",
    body: JSON.stringify({ playerId: getPlayerId(), ...record }),
  });
}

export async function fetchHistory() {
  const id = getPlayerId();
  return request<{ games: GameRecord[] }>(`/games?playerId=${id}`);
}

export async function fetchLeaderboard(period: "daily" | "weekly" | "all") {
  return request<{
    entries: { rank: number; playerId: string; wallet: string | null; score: number; swd: number }[];
  }>(`/leaderboard?period=${period}`);
}

export async function prepareWithdraw(wallet: string) {
  return request<{
    amount: string;
    nonce: string;
    deadline: string;
    signature: `0x${string}`;
    vault: `0x${string}`;
  }>("/withdraw/prepare", {
    method: "POST",
    body: JSON.stringify({ playerId: getPlayerId(), wallet }),
  });
}

export async function confirmWithdraw(payload: { nonce: string; txHash: string; amount: number }) {
  return request<{ ok: boolean }>("/withdraw/confirm", {
    method: "POST",
    body: JSON.stringify({ playerId: getPlayerId(), ...payload }),
  });
}

export async function fetchTxs() {
  const id = getPlayerId();
  return request<{
    txs: { id: string; kind: string; hash: string | null; amount: number; status: string; createdAt: string }[];
  }>(`/txs?playerId=${id}`);
}
