import React from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContractRead } from "wagmi";
import { formatEther } from "viem";
import smartWordLogo from "./images/pngs/smart-word-logo.png";
import { CONTRACTS, isDeployed, swdAbi } from "../lib/contracts";

const GameHeader: React.FC = () => {
  const { address } = useAccount();
  const { data: balance } = useContractRead({
    address: CONTRACTS.swd,
    abi: swdAbi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    enabled: Boolean(address && isDeployed(CONTRACTS.swd)),
    watch: true,
  });

  return (
    <div className={styles.headerCtn}>
      <div className={styles.logoCtn}>
        <Link href="/">
          <Image src={smartWordLogo} alt="Smart Word logo" />
        </Link>
      </div>
      <div className={styles.linksCtn}>
        <Link className={styles.linkTags} href="/Game/level">
          Game
        </Link>
        <Link className={styles.linkTags} href="/leaderboard">
          Board
        </Link>
        <Link className={styles.linkTags} href="/wallet">
          Wallet
        </Link>
        <Link className={styles.linkTags} href="/Marketplace">
          Shop
        </Link>
      </div>
      <div className={styles.headerRight}>
        {balance !== undefined && (
          <span className={styles.smcBadge}>
            {Number(formatEther(balance as bigint)).toFixed(1)} SWD
          </span>
        )}
        <ConnectButton />
      </div>
    </div>
  );
};

export default GameHeader;
