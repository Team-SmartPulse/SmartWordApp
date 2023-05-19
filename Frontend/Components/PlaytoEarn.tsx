import React from "react";
import {FaPlay} from "react-icons/fa";
import styles from "../styles/Home.module.css"
import Image from "next/image";
import ToEarn from "../Components/images/pngs/ToEarn.png";


function PlaytoEarn() {
  return (
    <div className={styles["image-text-section"]}>
      <div className={styles["text-container"]}>
        <h2>Play to Earn</h2>
        <p className={styles["bridge"]}>
          Connect your preferred cryptocurrency wallet from the available
          wallets when you sign up to earn and accumulate your rewards in
          cryptocurrency.
        </p>
        <button className={styles["hero-btn"]}><FaPlay />Play to Earn</button>
      </div>

      
      <div className={styles["img-container"]}>
        <Image src={ToEarn} className={styles["ToEarn-logo"]} alt="img" />
      </div>
    </div>
  );
}

export default PlaytoEarn;
