import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import Coin from "../../Components/images/pngs/coins.png";
import Star from "../../Components/images/pngs/star.png";
import Touch from "../../Components/images/pngs/touch.png";
import Bulb from "../../Components/images/pngs/bulb.png";
import PlayIcon from "../../Components/images/pngs/Play.png";
import GameHeader from "../../Components/gameHeader";
import { LEVELS, LevelId, parseMode } from "../../lib/game";

const Level: React.FC = () => {
  const router = useRouter();
  const mode = parseMode(router.query.mode);

  const cards: { id: LevelId; extra: string }[] = [
    { id: 1, extra: "5-letter boards · 3:00 timer" },
    { id: 2, extra: "6-letter boards · 2:00 timer · lives" },
    { id: 3, extra: "7-letter boards · 1:30 timer · lives" },
  ];

  return (
    <div className={styles.stagesCtn}>
      <GameHeader />
      <div className={styles.stageTextCtn}>
        <p>Game level</p>
        <p>
          {mode === "earn"
            ? "Clear the board to bank SWD. Withdraw to your wallet from the dashboard."
            : "Practice mode. Same puzzles, no SWD rewards."}
        </p>
      </div>
      <div className={styles.levelDiv}>
        {cards.map(({ id, extra }) => {
          const level = LEVELS[id];
          return (
            <div key={id}>
              <p>
                {level.name} Level — {extra}
              </p>
              <div>
                <div className={styles.periDiv}>
                  <Image src={Coin} alt="SWD" />
                  <p>{mode === "earn" ? `+${level.swdBonus} SWD` : "Practice"}</p>
                </div>
                <div className={styles.levelPeriDiv}>
                  <div>
                    <div>
                      <Image src={Bulb} alt="Hints" />
                    </div>
                    <p>x{level.hints}</p>
                  </div>
                  <div>
                    <Image src={Touch} alt="Lives" />
                    <p>x{level.lives || "∞"}</p>
                  </div>
                  <div>
                    <Image src={Star} alt="Timer" />
                    <p>{level.timeLimit}s</p>
                  </div>
                </div>
                <Link href={`/Game/stages?level=${id}&mode=${mode}`}>
                  <button className={styles.playBtn}>
                    <Image src={PlayIcon} alt="Play" />
                    Play
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Level;
