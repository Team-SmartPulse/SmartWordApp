import React from "react";
import "./ReadyToPlay.css";


function ReadyToPlay() {
  return (
    <div className={styles["ready-to-play-container"]}>
      <h1 className={styles["ready-to-play-header"]}>Ready to Start Playing?</h1>
      <div className={styles["content-container"]}>
        <p className={styles["text"]}>Enjoy the Best gaming experience.</p>
        <ConnectButton />
      </div>
    </div>
  );
}

export default ReadyToPlay;
