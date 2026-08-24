import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import styles from "../styles/Home.module.css";
import { fetchLeaderboard } from "../lib/api";
import {
  LEVELS,
  SWD_SCORE_DIVISOR,
  getPlayerId,
  loadHistory,
} from "../lib/game";

type Period = "daily" | "weekly" | "all";
type Entry = { rank: number; playerId: string; wallet: string | null; score: number; swd: number };

function inPeriod(createdAt: string, period: Period) {
  if (period === "all") return true;
  const age = Date.now() - new Date(createdAt).getTime();
  return period === "daily" ? age <= 86400000 : age <= 7 * 86400000;
}

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<Period>("daily");
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const games = loadHistory().filter((game) => inPeriod(game.createdAt, period));
    const mine: Entry | null = games.length
      ? {
          rank: 1,
          playerId: getPlayerId(),
          wallet: null,
          score: games.reduce((sum, game) => sum + game.score, 0),
          swd: games.reduce((sum, game) => sum + game.swd, 0),
        }
      : null;

    fetchLeaderboard(period).then((data) => {
      const remote = data?.entries || [];
      if (!mine) {
        setEntries(remote);
        return;
      }
      const withoutMine = remote.filter((entry) => entry.playerId !== mine.playerId);
      const merged = [mine, ...withoutMine]
        .sort((a, b) => b.score - a.score)
        .map((entry, index) => ({ ...entry, rank: index + 1 }));
      setEntries(merged);
    });
  }, [period]);

  const you = entries.find((entry) => entry.playerId === (typeof window !== "undefined" ? getPlayerId() : ""));

  return (
    <div className={styles.walletShell}>
      <Header />
      <main className={styles.walletMain}>
        <section className={styles.walletHero}>
          <div>
            <p className={styles.walletEyebrow}>Off-chain rankings</p>
            <h1>Leaderboard</h1>
            <p className={styles.walletLead}>
              Points measure how well you played. SWD is only awarded when you
              finish a stage in Play to Earn.
            </p>
          </div>
        </section>

        <div className={styles.swdExplain}>
          <h2>How points become SWD</h2>
          <p>
            <strong>SWD = floor(score ÷ {SWD_SCORE_DIVISOR}) + level bonus</strong>
          </p>
          <ul>
            <li>Beginner bonus +{LEVELS[1].swdBonus} · Intermediate +{LEVELS[2].swdBonus} · Advanced +{LEVELS[3].swdBonus}</li>
            <li>Practice mode keeps the points and pays <strong>0 SWD</strong></li>
            <li>Incomplete / timed-out rounds pay 0 SWD</li>
            <li>Pending SWD sits in your wallet until you withdraw on-chain</li>
          </ul>
          {you && you.swd === 0 && you.score > 0 && (
            <p>
              You have {you.score} pts and 0 SWD — that usually means Practice
              mode or a round that did not finish. Points are not converted
              later; only a completed Play to Earn stage pays SWD.
              {" "}
              <Link href="/Game/level?mode=earn">Start Play to Earn</Link>
            </p>
          )}
        </div>

        <div className={styles.walletActions}>
          {(["daily", "weekly", "all"] as Period[]).map((value) => (
            <button
              key={value}
              className={period === value ? styles.walletPrimaryBtn : styles.walletSecondaryBtn}
              onClick={() => setPeriod(value)}
              type="button"
            >
              {value}
            </button>
          ))}
        </div>

        <section className={styles.walletPanel}>
          <div className={styles.walletPanelHead}>
            <h2>{period} standings</h2>
          </div>
          {entries.length === 0 && (
            <div className={styles.walletEmpty}>
              <p>No completed games in this window.</p>
              <Link href="/Game/level?mode=earn">Play to Earn</Link>
            </div>
          )}
          <div className={styles.walletTable}>
            {entries.map((entry) => (
              <div key={entry.playerId} className={styles.walletTableRow}>
                <div>
                  <strong>#{entry.rank}</strong>
                  <span>
                    {entry.wallet
                      ? `${entry.wallet.slice(0, 6)}…${entry.wallet.slice(-4)}`
                      : `Player ${entry.playerId.slice(0, 8)}`}
                  </span>
                </div>
                <span>{entry.score} pts</span>
                <span className={entry.swd > 0 ? styles.walletPositive : styles.walletMuted}>
                  {entry.swd} SWD
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
