import React from "react";
import {FaPlay} from "react-icons/fa";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import ForFree from "../Components/images/pngs/ForFree.png"

function PlayforFree() {
  return (
    <div className={styles["image-section"]}>
      <div className={styles["heading-container"]}>
        <h2>Play for Free</h2>
        <p className={styles["letters"]}>
          Enjoy the best and most fun gaming experience when you play games for
          free.
        </p>
        <button className={styles["hero-button"]}><FaPlay />Play for Free</button>
        
        
      </div>
      <div className={styles["image-container"]}>
        <Image src={ForFree} className={styles["ForFree-logo"]} alt="img" />
      </div>
    </div>
  );
}

export default PlayforFree;
