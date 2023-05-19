import React from "react";
import styles from "../styles/Home.module.css";
import Decentralized from "../Components/images/pngs/Decentralized.png"
import ConnectWallet from "../Components/images/pngs/ConnectWallet.png"
import SolvePuzzle from "../Components/images/pngs/SolvePuzzle.png"
import EarnCrypto from "../Components/images/pngs/EarnCrypto.png"
import Image from "next/image";

function Card(props:any) {
  return (
    <div className={styles["card"]}>
      <Image src={props.image} alt={props.alt} className={styles["card-image"]} />
      <div className={styles["card-content"]}>
        <h3 className={styles["card-header"]}>{props.header}</h3>
        <p className={styles["card-text"]}>{props.text}</p>
      </div>
    </div>
  );
}

function AboutUs() {
  return (
    <div className={styles["about-us-container"]}>
      <h1 className={styles["about-us-header"]}>About Us</h1>
      <p>
        We are passionate about creating puzzles that challenge and engage our
        players, while also providing a relaxing and enjoyable experience.
      </p>
      <div className={styles["card-container"]}>
        <Card
          image={Decentralized}
          alt="Img"
          header="Decentralized Nature"
          text="Players have full control over their digital assets and rewards and also
          provides a high level of security and transparency."
        />

        <Card
          image={ConnectWallet}
          alt="Img"
          header="Connect Wallet to Play"
          text="Deliver education and training
           to a wide audience, while overcoming the 
            limitations of physical location."
        />

        <Card
          image={SolvePuzzle}
          alt="Img"
          header="Solve Puzzle"
          text="Develop and deliver course content online to students who are 
           interested in learning about a particular subject."
        />

        <Card
          image={EarnCrypto}
          alt="Img"
          header="Earn in Cryptocurrency"
          text="Earn rewards that can be used to buy 
           hints, boosters or cashout to other cryptocurriencies."
        />
      </div>
    </div>
  );
}


export default AboutUs;
