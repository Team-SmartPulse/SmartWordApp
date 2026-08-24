import fs from "fs";
import path from "path";
import initSqlJs, { Database } from "sql.js";

const DATA_DIR = path.join(__dirname, "..", "data");
const DB_FILE = path.join(DATA_DIR, "smartword.sqlite");

let db: Database;

export async function openDb() {
  const SQL = await initSqlJs();
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (fs.existsSync(DB_FILE)) {
    db = new SQL.Database(fs.readFileSync(DB_FILE));
  } else {
    db = new SQL.Database();
  }
  db.run(`
    CREATE TABLE IF NOT EXISTS players (
      player_id TEXT PRIMARY KEY,
      wallet TEXT,
      pending_swd REAL DEFAULT 0,
      total_earned REAL DEFAULT 0,
      total_score INTEGER DEFAULT 0,
      withdrawn_swd REAL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS games (
      id TEXT PRIMARY KEY,
      player_id TEXT,
      level INTEGER,
      stage INTEGER,
      mode TEXT,
      score INTEGER,
      swd REAL,
      words TEXT,
      duration INTEGER,
      completed INTEGER,
      created_at TEXT
    );
    CREATE TABLE IF NOT EXISTS txs (
      id TEXT PRIMARY KEY,
      player_id TEXT,
      kind TEXT,
      hash TEXT,
      amount REAL,
      status TEXT,
      nonce TEXT,
      created_at TEXT
    );
    CREATE TABLE IF NOT EXISTS indexed_events (
      id TEXT PRIMARY KEY,
      kind TEXT,
      payload TEXT,
      created_at TEXT
    );
  `);
  persist();
  return db;
}

export function persist() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DB_FILE, Buffer.from(db.export()));
}

export function getDb() {
  return db;
}

export function one<T>(sql: string, params: unknown[] = []): T | undefined {
  const stmt = db.prepare(sql);
  stmt.bind(params as never[]);
  const row = stmt.step() ? (stmt.getAsObject() as T) : undefined;
  stmt.free();
  return row;
}

export function many<T>(sql: string, params: unknown[] = []): T[] {
  const stmt = db.prepare(sql);
  stmt.bind(params as never[]);
  const rows: T[] = [];
  while (stmt.step()) rows.push(stmt.getAsObject() as T);
  stmt.free();
  return rows;
}

export function run(sql: string, params: unknown[] = []) {
  db.run(sql, params as never[]);
  persist();
}
