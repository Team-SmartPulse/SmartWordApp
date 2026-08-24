import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import GameHeader from "../../Components/gameHeader";
import { GameRecord, LEVELS, loadHistory, loadLocalProgress, loadPendingSwd } from "../../lib/game";
import { fetchHistory } from "../../lib/api";

export default function ProfilePage() {
  const [history, setHistory] = useState<GameRecord[]>([]);
  const progress = typeof window === "undefined" ? { 1: 0, 2: 0, 3: 0 } : loadLocalProgress();
  const [pending, setPending] = useState(0);

  useEffect(() => {
    setHistory(loadHistory());
    setPending(loadPendingSwd());
    fetchHistory().then((data) => {
      if (data?.games?.length) setHistory(data.games as GameRecord[]);
    });
  }, []);

  return (
    <div className={styles.stagesCtn}>
      <GameHeader />
      <div className={styles.stageTextCtn}>
        <p>Statistics</p>
        <p>Local and API game history. Wallet balances live on the dashboard.</p>
      </div>
      <div className={styles.profileGrid}>
        <div className={styles.profileCard}>
          <h3>{LEVELS[1].name}</h3>
          <p>Stage {progress[1]} / 20</p>
        </div>
        <div className={styles.profileCard}>
          <h3>{LEVELS[2].name}</h3>
          <p>Stage {progress[2]} / 20</p>
        </div>
        <div className={styles.profileCard}>
          <h3>{LEVELS[3].name}</h3>
          <p>Stage {progress[3]} / 20</p>
        </div>
        <div className={styles.profileCard}>
          <h3>Pending SWD</h3>
          <p>{pending}</p>
        </div>
      </div>
      <div className={styles.historyList}>
        {history.slice(0, 15).map((game) => (
          <div key={game.id} className={styles.historyRow}>
            <span>
              {LEVELS[game.level as 1 | 2 | 3]?.name} {game.stage}
            </span>
            <span>{game.score} pts</span>
            <span>{game.completed ? `+${game.swd} SWD` : "Incomplete"}</span>
          </div>
        ))}
      </div>
      <div className={styles.btns}>
        <Link href="/wallet">
          <button className={styles.playBtn}>Open wallet</button>
        </Link>
        <Link href="/Game/level?mode=earn">
          <button className={styles.playBtn}>Play to earn</button>
        </Link>
      </div>
    </div>
  );
}
