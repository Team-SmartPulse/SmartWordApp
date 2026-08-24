import React, { useState } from "react";
import { parseEther } from "viem";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import styles from "../styles/Home.module.css";
import { GAME_ITEMS } from "../lib/catalog";
import { CONTRACTS, isDeployed, marketAbi, swdAbi } from "../lib/contracts";
import { TxPhase, TxStatus } from "./TxStatus";

export default function Shop() {
  const { address, isConnected } = useAccount();
  const [selected, setSelected] = useState(GAME_ITEMS[0].id);
  const [phase, setPhase] = useState<TxPhase>("idle");
  const item = GAME_ITEMS.find((entry) => entry.id === selected)!;
  const deployed = isDeployed(CONTRACTS.market) && isDeployed(CONTRACTS.swd);
  const price = parseEther(`${item.priceSwd}` as `${number}`);

  const { data: allowance } = useContractRead({
    address: CONTRACTS.swd,
    abi: swdAbi,
    functionName: "allowance",
    args: address ? [address, CONTRACTS.market] : undefined,
    enabled: Boolean(address && deployed),
    watch: true,
  });

  const { config: approveConfig } = usePrepareContractWrite({
    address: CONTRACTS.swd,
    abi: swdAbi,
    functionName: "approve",
    args: [CONTRACTS.market, price],
    enabled: Boolean(deployed && isConnected),
  });
  const approveWrite = useContractWrite(approveConfig);
  const approveWait = useWaitForTransaction({ hash: approveWrite.data?.hash });

  const approved =
    approveWait.isSuccess || (typeof allowance === "bigint" && allowance >= price);

  const { config: buyConfig } = usePrepareContractWrite({
    address: CONTRACTS.market,
    abi: marketAbi,
    functionName: "buyFromShop",
    args: [BigInt(item.id), BigInt(1)],
    enabled: Boolean(deployed && isConnected && approved),
  });
  const buyWrite = useContractWrite(buyConfig);
  const buyWait = useWaitForTransaction({ hash: buyWrite.data?.hash });

  const buy = () => {
    setPhase("submitted");
    buyWrite.write?.();
  };

  const approve = () => {
    setPhase("submitted");
    approveWrite.write?.();
  };

  const currentPhase: TxPhase = buyWait.isSuccess
    ? "success"
    : buyWait.isLoading || approveWait.isLoading
    ? "confirming"
    : buyWait.isError || approveWait.isError
    ? "error"
    : phase;

  return (
    <div className={styles.shopCtn} id="create">
      <h2>SmartWord items</h2>
      <p>
        Each card is an ERC-1155 collectible. Art is on the card; SWD is the
        checkout currency after you withdraw winnings.
      </p>
      <TxStatus
        phase={currentPhase}
        successText="NFT purchased successfully!"
        error="Transaction failed. Please try again."
      />
      <div className={styles.nftGrid}>
        {GAME_ITEMS.map((entry) => (
          <button
            key={entry.id}
            type="button"
            className={selected === entry.id ? styles.nftCardActive : styles.nftCard}
            onClick={() => setSelected(entry.id)}
          >
            <div className={styles.nftArtWrap}>
              <img src={entry.image} alt={entry.name} className={styles.nftArt} />
            </div>
            <p className={styles.rarity}>{entry.rarity}</p>
            <h3>{entry.name}</h3>
            <p className={styles.nftType}>{entry.type}</p>
            <p className={styles.nftBlurb}>{entry.utility}</p>
            <strong>{entry.priceSwd} SWD</strong>
          </button>
        ))}
      </div>
      <div className={styles.nftDetail}>
        <img src={item.image} alt={item.name} className={styles.nftDetailArt} />
        <div>
          <p className={styles.rarity}>{item.rarity}</p>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>{item.utility}</p>
          <strong>{item.priceSwd} SWD</strong>
        </div>
      </div>
      {!deployed && (
        <p className={styles.shopBanner}>
          On-chain buy unlocks after SmartWordToken, Items, and Marketplace are
          deployed. You can still browse the collection.
        </p>
      )}
      {deployed && (
        <div className={styles.walletActions}>
          <button className={styles.walletPrimaryBtn} onClick={approve} disabled={!approveWrite.write} type="button">
            {approved ? "SWD approved" : `Approve ${item.priceSwd} SWD`}
          </button>
          <button className={styles.walletSecondaryBtn} onClick={buy} disabled={!buyWrite.write} type="button">
            Buy {item.name}
          </button>
        </div>
      )}
    </div>
  );
}
