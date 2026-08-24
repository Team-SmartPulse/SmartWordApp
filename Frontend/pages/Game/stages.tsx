import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import StageImg from "../../Components/images/pngs/stageIcon.png";
import GameHeader from "../../Components/gameHeader";
import {
  LEVELS,
  STAGES_PER_LEVEL,
  isStageUnlocked,
  loadLocalProgress,
  parseLevelId,
  parseMode,
} from "../../lib/game";

const Stages: React.FC = () => {
  const router = useRouter();
  const levelId = parseLevelId(router.query.level);
  const mode = parseMode(router.query.mode);
  const level = LEVELS[levelId];
  const [highest, setHighest] = useState(0);

  useEffect(() => {
    setHighest(loadLocalProgress()[levelId]);
  }, [levelId]);

  const numbering = Array.from({ length: STAGES_PER_LEVEL }, (_, i) => i + 1);

  return (
    <div className={styles.stagesCtn}>
      <GameHeader />
      <div className={styles.stageTextCtn}>
        <p>{level.name} level</p>
        <p>Choose an unlocked stage · {mode === "earn" ? "Earn SWD" : "Practice"}</p>
      </div>
      <div className={styles.stageDiv}>
        {numbering.map((number) => {
          const unlocked = isStageUnlocked(highest, number);
          const cleared = number <= highest;
          return unlocked ? (
            <Link
              key={number}
              href={`/Game/play?level=${levelId}&stage=${number}&mode=${mode}`}
            >
              <div className={`${styles.stages} ${styles.stageUnlocked}`} data-cleared={cleared}>
                <Image src={StageImg} alt={`Stage ${number}`} />
                <p>Stage {number}</p>
              </div>
            </Link>
          ) : (
            <div className={styles.stages} key={number}>
              <Image src={StageImg} alt={`Stage ${number} locked`} />
              <p>Stage {number}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stages;
