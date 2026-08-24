export const LEVELS = {
  1: {
    id: 1,
    name: "Beginner",
    wordLength: 5,
    slots: [2, 3, 4, 5],
    timeLimit: 180,
    lives: 0,
    hints: 2,
    swdBonus: 8,
  },
  2: {
    id: 2,
    name: "Intermediate",
    wordLength: 6,
    slots: [2, 3, 4, 5, 6],
    timeLimit: 120,
    lives: 5,
    hints: 1,
    swdBonus: 18,
  },
  3: {
    id: 3,
    name: "Advanced",
    wordLength: 7,
    slots: [3, 4, 5, 6, 7],
    timeLimit: 90,
    lives: 3,
    hints: 1,
    swdBonus: 32,
  },
} as const;

export type LevelId = keyof typeof LEVELS;
export type PlayMode = "free" | "earn";
export const STAGES_PER_LEVEL = 20;

export type GameRecord = {
  id: string;
  level: LevelId;
  stage: number;
  mode: PlayMode;
  score: number;
  swd: number;
  words: string[];
  duration: number;
  completed: boolean;
  createdAt: string;
};

export type RewardBreakdown = {
  score: number;
  swd: number;
  wordScore: number;
  timeBonus: number;
  completion: number;
  penalties: number;
};

export function isLevelId(value: unknown): value is LevelId {
  return value === 1 || value === 2 || value === 3;
}

export function parseLevelId(raw: string | string[] | undefined): LevelId {
  const n = Number(Array.isArray(raw) ? raw[0] : raw);
  return isLevelId(n) ? n : 1;
}

export function parseStage(raw: string | string[] | undefined): number {
  const n = Number(Array.isArray(raw) ? raw[0] : raw);
  if (!Number.isInteger(n) || n < 1) return 1;
  return Math.min(n, STAGES_PER_LEVEL);
}

export function parseMode(raw: string | string[] | undefined): PlayMode {
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value === "earn" ? "earn" : "free";
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function letterCounts(letters: string[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const letter of letters) {
    const key = letter.toLowerCase();
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

export function canFormWord(word: string, letters: string[]): boolean {
  const counts = letterCounts(letters);
  for (const char of word.toLowerCase()) {
    if (!counts[char]) return false;
    counts[char] -= 1;
  }
  return true;
}

export function wordsFromLetters(
  dictionary: string[],
  letters: string[],
  length: number
): string[] {
  return dictionary.filter(
    (word) => word.length === length && canFormWord(word, letters)
  );
}

export function isValidGuess(
  word: string,
  letters: string[],
  dictionary: string[],
  minLength: number
): boolean {
  const normalized = word.toLowerCase();
  if (normalized.length < minLength) return false;
  if (!/^[a-z]+$/.test(normalized)) return false;
  if (!canFormWord(normalized, letters)) return false;
  return dictionary.includes(normalized);
}

export function scoreWord(length: number): number {
  return length * length * 10;
}

/** Points are not 1:1 with SWD. Earn-mode clears convert score with this formula. */
export const SWD_SCORE_DIVISOR = 50;

export function swdFromScore(score: number, levelId: LevelId): number {
  return Math.max(1, Math.floor(score / SWD_SCORE_DIVISOR) + LEVELS[levelId].swdBonus);
}

export function calculateRewards(input: {
  words: string[];
  levelId: LevelId;
  secondsLeft: number;
  hintsUsed: number;
  livesLost: number;
  completed: boolean;
  mode: PlayMode;
}): RewardBreakdown {
  const wordScore = input.words.reduce((sum, word) => sum + scoreWord(word.length), 0);
  const timeBonus = input.completed ? input.secondsLeft * 8 * input.levelId : 0;
  const completion = input.completed ? 150 * input.levelId : 0;
  const penalties = input.hintsUsed * 25 + input.livesLost * 15;
  const score = Math.max(0, wordScore + timeBonus + completion - penalties);
  const swd =
    input.mode === "earn" && input.completed ? swdFromScore(score, input.levelId) : 0;
  return { score, swd, wordScore, timeBonus, completion, penalties };
}

export type Round = {
  seed: string;
  letters: string[];
  solutions: Record<number, string[]>;
};

export function buildRound(
  dictionary: string[],
  wordLength: number,
  slots: readonly number[]
): Round | null {
  const seeds = shuffle(dictionary.filter((word) => word.length === wordLength));
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  for (const seed of seeds.slice(0, 120)) {
    for (let extraTry = 0; extraTry < 10; extraTry++) {
      const extra = alphabet[Math.floor(Math.random() * alphabet.length)];
      const letters = (seed + extra).split("");
      const solutions: Record<number, string[]> = {};
      let valid = true;
      for (const slot of slots) {
        const found = wordsFromLetters(dictionary, letters, slot);
        if (found.length === 0) {
          valid = false;
          break;
        }
        solutions[slot] = found;
      }
      if (valid) {
        return {
          seed,
          letters: shuffle(letters).map((letter) => letter.toUpperCase()),
          solutions,
        };
      }
    }
  }
  return null;
}

const PROGRESS_KEY = "smartword.progress";
const HISTORY_KEY = "smartword.history";
const PENDING_SWD_KEY = "smartword.pendingSwd";
const PLAYER_KEY = "smartword.playerId";

export type LocalProgress = Record<LevelId, number>;

export function getPlayerId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem(PLAYER_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `player-${Date.now()}`;
    window.localStorage.setItem(PLAYER_KEY, id);
  }
  return id;
}

export function loadLocalProgress(): LocalProgress {
  if (typeof window === "undefined") return { 1: 0, 2: 0, 3: 0 };
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    if (!raw) return { 1: 0, 2: 0, 3: 0 };
    const parsed = JSON.parse(raw) as Partial<LocalProgress>;
    return {
      1: Number(parsed[1]) || 0,
      2: Number(parsed[2]) || 0,
      3: Number(parsed[3]) || 0,
    };
  } catch {
    return { 1: 0, 2: 0, 3: 0 };
  }
}

export function saveLocalProgress(level: LevelId, stage: number) {
  const current = loadLocalProgress();
  if (stage > current[level]) {
    current[level] = stage;
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(current));
  }
}

export function loadHistory(): GameRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as GameRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveHistory(record: GameRecord) {
  const next = [record, ...loadHistory()].slice(0, 100);
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
}

export function loadPendingSwd(): number {
  if (typeof window === "undefined") return 0;
  return Number(window.localStorage.getItem(PENDING_SWD_KEY) || 0);
}

export function addPendingSwd(amount: number) {
  const next = loadPendingSwd() + amount;
  window.localStorage.setItem(PENDING_SWD_KEY, String(next));
}

export function clearPendingSwd() {
  window.localStorage.setItem(PENDING_SWD_KEY, "0");
}

export function isStageUnlocked(highestCompleted: number, stage: number): boolean {
  return stage <= highestCompleted + 1;
}
