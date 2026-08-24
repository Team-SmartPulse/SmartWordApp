import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import smartWordLogo from "./images/pngs/smart-word-logo.png";

const MarketPlaceHeader = () => {
  return (
    <div className={styles.headerCtn}>
      <div className={styles.logoCtn}>
        <Link href="/">
          <Image src={smartWordLogo} alt="Smart Word logo" />
        </Link>
      </div>
      <div className={styles.linksCtn}>
        <Link href="/" className={styles.linkTags}>
          Home
        </Link>
        <Link href="/Game/level" className={styles.linkTags}>
          Games
        </Link>
        <Link href="/Marketplace" className={styles.linkTags}>
          Marketplace
        </Link>
        <Link href="/wallet" className={styles.linkTags}>
          Wallet
        </Link>
        <ConnectButton />
      </div>
    </div>
  );
};

export default MarketPlaceHeader;
