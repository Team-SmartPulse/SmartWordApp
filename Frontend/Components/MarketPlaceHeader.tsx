import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import coinmarketcap from "./images/pngs/coinmarketcap.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import smartWordLogo from "./images/pngs/smart-word-logo.png";
import uniswap from "../Components/images/pngs/uniswap.png";

const MarketPlaceHeader: React.FC = () => {
  return (
    <div className={styles.headerCtn}>
      <div className={styles.logoCtn}>
        <Image src={smartWordLogo} alt="Logo" />
      </div>
      <div className={styles.linksCtn}>
        <Link href="/">
          <a className={styles.linkTags}>Home</a>
        </Link>
        <Link href="/games">
          <a className={styles.linkTags}>Games</a>
        </Link>
        <Link href="/Marketplace">
          <a className={styles.linkTags}>Marketplace</a>
        </Link>
        <Link href="/team">
          <a className={styles.linkTags}>Team</a>
        </Link>
        <div>
          <select className={styles.token}>
            <option selected>Buy Token</option>
            <option value="smartCoinSwap">SmartCoin Swap</option>
            {/* <Image src={} alt=''/> */}
            <option value="uniswap" className={styles.uniSwap}>
              <div>
                <Image src={uniswap} alt="Uniswap" />
              </div>
              <span>Uniswap</span>
            </option>
            <option value="coinmarketcap">
              <Image src={coinmarketcap} alt="Coinmarket" />
              CoinMarketCap
            </option>
            <option value="metaverse">Metaverse</option>
          </select>
        </div>
        <ConnectButton />
      </div>
    </div>
  );
};

export default MarketPlaceHeader;
