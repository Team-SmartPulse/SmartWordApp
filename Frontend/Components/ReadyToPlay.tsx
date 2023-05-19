import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import styles from "../styles/Home.module.css"
function ReadyToPlay() {
  return (
    <div className={styles["ready-to-play-container"]}>
      <h1 className={styles["ready-to-play-header"]}>Ready to Start Playing?</h1>
      <div className={styles["content-container"]}>
        <p className={styles["text"]}>Enjoy the Best gaming experience.</p>
      </div>
      <ConnectButton />
    </div>
  );
}

export default ReadyToPlay;
