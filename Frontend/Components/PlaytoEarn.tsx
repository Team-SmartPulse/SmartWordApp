import React from "react";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import ToEarn from "../Components/images/pngs/ToEarn.png";

function PlaytoEarn() {
  return (
    <div className={styles["image-text-section"]}>
      <div className={styles["text-container"]}>
        <h2>Play to Earn</h2>
        <p className={styles["bridge"]}>
            Connect your wallet when you are ready to withdraw SmartWord Token
            (SWD) earned from completed stages.
        </p>
        <Link href="/Game/level?mode=earn">
          <button className={styles["hero-btn"]}>
            <FaPlay />
            Play to Earn
          </button>
        </Link>
      </div>
      <div className={styles["img-container"]}>
        <Image src={ToEarn} className={styles["ToEarn-logo"]} alt="Play to earn" />
      </div>
    </div>
  );
}

export default PlaytoEarn;
