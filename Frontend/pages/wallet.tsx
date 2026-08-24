import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { formatEther } from "viem";
import { FaWallet, FaCoins, FaClock, FaTrophy, FaLayerGroup, FaCopy, FaCheck } from "react-icons/fa";
import styles from "../styles/Home.module.css";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import { TxStatus, TxPhase } from "../Components/TxStatus";
import { CONTRACTS, isDeployed, itemsAbi, swdAbi, vaultAbi } from "../lib/contracts";
import { GAME_ITEMS } from "../lib/catalog";
import { GameRecord, LEVELS, LevelId, clearPendingSwd, loadHistory, loadLocalProgress, loadPendingSwd } from "../lib/game";
import { confirmWithdraw, fetchHistory, fetchPlayer, fetchTxs, prepareWithdraw, syncPlayer } from "../lib/api";

export default function WalletPage() {
  const { address, isConnected } = useAccount();
  const [pending, setPending] = useState(0);
  const [history, setHistory] = useState<GameRecord[]>([]);
  const [earned, setEarned] = useState(0);
  const [txs, setTxs] = useState<{ kind: string; hash: string | null; amount: number; status: string; createdAt: string }[]>([]);
  const [phase, setPhase] = useState<TxPhase>("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState({ 1: 0, 2: 0, 3: 0 });
  const [claimArgs, setClaimArgs] = useState<{
    amount: bigint;
    nonce: bigint;
    deadline: bigint;
    signature: `0x${string}`;
  } | null>(null);

  const { data: onChainBal } = useContractRead({
    address: CONTRACTS.swd,
    abi: swdAbi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    enabled: Boolean(address && isDeployed(CONTRACTS.swd)),
    watch: true,
  });

  const itemIds = GAME_ITEMS.map((item) => BigInt(item.id));
  const { data: nftBalances } = useContractRead({
    address: CONTRACTS.items,
    abi: itemsAbi,
    functionName: "balanceOfBatch",
    args:
      address && isDeployed(CONTRACTS.items)
        ? [itemIds.map(() => address), itemIds]
        : undefined,
    enabled: Boolean(address && isDeployed(CONTRACTS.items)),
    watch: true,
  });

  const { config: claimConfig } = usePrepareContractWrite({
    address: CONTRACTS.vault,
    abi: vaultAbi,
    functionName: "claim",
    args: claimArgs ? [claimArgs.amount, claimArgs.nonce, claimArgs.deadline, claimArgs.signature] : undefined,
    enabled: Boolean(claimArgs && isDeployed(CONTRACTS.vault)),
  });
  const claimWrite = useContractWrite(claimConfig);
  const claimWait = useWaitForTransaction({ hash: claimWrite.data?.hash });

  useEffect(() => {
    setPending(loadPendingSwd());
    setHistory(loadHistory());
    setEarned(loadHistory().reduce((sum, game) => sum + game.swd, 0));
    setProgress(loadLocalProgress());
    fetchHistory().then((data) => {
      if (data?.games?.length) setHistory(data.games as GameRecord[]);
    });
    fetchPlayer().then((player) => {
      if (player) {
        setPending(player.pendingSwd);
        setEarned(player.totalEarned);
      }
    });
    fetchTxs().then((data) => {
      if (data?.txs) setTxs(data.txs);
    });
  }, []);

  useEffect(() => {
    if (address) syncPlayer(address);
  }, [address]);

  useEffect(() => {
    if (claimWrite.data?.hash) setPhase("confirming");
  }, [claimWrite.data?.hash]);

  useEffect(() => {
    if (claimWait.isSuccess && claimArgs) {
      setPhase("success");
      confirmWithdraw({
        nonce: claimArgs.nonce.toString(),
        txHash: claimWrite.data?.hash || "",
        amount: pending,
      });
      clearPendingSwd();
      setPending(0);
    }
    if (claimWait.isError) {
      setPhase("error");
      setError("Withdraw failed on-chain.");
    }
  }, [claimWait.isSuccess, claimWait.isError, claimArgs, claimWrite.data?.hash, pending]);

  useEffect(() => {
    if (claimArgs && claimWrite.write) claimWrite.write();
  }, [claimArgs, claimWrite.write]);

  const owned = useMemo(() => {
    const balances = (nftBalances as bigint[] | undefined) || [];
    return GAME_ITEMS.map((item, index) => ({
      ...item,
      owned: Number(balances[index] || 0),
    })).filter((item) => item.owned > 0);
  }, [nftBalances]);

  const walletSwd =
    onChainBal !== undefined ? Number(formatEther(onChainBal as bigint)).toFixed(2) : isConnected ? "0.00" : "—";

  const startWithdraw = async () => {
    if (!address) {
      setPhase("error");
      setError("Connect a wallet first.");
      return;
    }
    setPhase("submitted");
    const prepared = await prepareWithdraw(address);
    if (!prepared) {
      setPhase("error");
      setError("Deploy RewardVault and start the signer API to withdraw on-chain.");
      return;
    }
    setClaimArgs({
      amount: BigInt(prepared.amount),
      nonce: BigInt(prepared.nonce),
      deadline: BigInt(prepared.deadline),
      signature: prepared.signature,
    });
  };

  const copyAddress = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className={styles.walletShell}>
      <Header />
      <main className={styles.walletMain}>
        <section className={styles.walletHero}>
          <div>
            <p className={styles.walletEyebrow}>SmartWord dashboard</p>
            <h1>My Wallet</h1>
            <p className={styles.walletLead}>
              Play off-chain, bank SWD, then withdraw to Celo when you are ready.
            </p>
          </div>
          <div className={styles.walletHeroActions}>
            {!isConnected && <ConnectButton />}
            {isConnected && address && (
              <button className={styles.walletGhostBtn} onClick={copyAddress} type="button">
                {copied ? <FaCheck /> : <FaCopy />}
                {copied ? "Copied" : `${address.slice(0, 6)}…${address.slice(-4)}`}
              </button>
            )}
          </div>
        </section>

        {!isConnected && (
          <div className={styles.walletConnectCard}>
            <div>
              <h2>Connect to see on-chain SWD</h2>
              <p>
                You can keep playing and earning pending tokens without a wallet.
                Connect when you want to withdraw or collect NFTs.
              </p>
            </div>
            <ConnectButton />
          </div>
        )}

        <TxStatus phase={phase} successText="SWD withdrawn to your wallet." error={error} />

        <section className={styles.walletStats}>
          <article className={styles.walletStat}>
            <span className={styles.walletStatIcon}><FaWallet /></span>
            <span className={styles.walletStatLabel}>Wallet status</span>
            <strong>{isConnected ? "Connected" : "Not connected"}</strong>
          </article>
          <article className={styles.walletStat}>
            <span className={styles.walletStatIcon}><FaCoins /></span>
            <span className={styles.walletStatLabel}>SWD in wallet</span>
            <strong>{walletSwd}</strong>
          </article>
          <article className={`${styles.walletStat} ${pending > 0 ? styles.walletStatAccent : ""}`}>
            <span className={styles.walletStatIcon}><FaClock /></span>
            <span className={styles.walletStatLabel}>Pending SWD</span>
            <strong>{pending.toFixed(0)}</strong>
          </article>
          <article className={styles.walletStat}>
            <span className={styles.walletStatIcon}><FaTrophy /></span>
            <span className={styles.walletStatLabel}>Total earned</span>
            <strong>{earned.toFixed(0)}</strong>
          </article>
          <article className={styles.walletStat}>
            <span className={styles.walletStatIcon}><FaLayerGroup /></span>
            <span className={styles.walletStatLabel}>NFTs owned</span>
            <strong>{owned.length}</strong>
          </article>
        </section>

        <section className={styles.walletProgress}>
          {([1, 2, 3] as LevelId[]).map((id) => {
            const level = LEVELS[id];
            const cleared = progress[id];
            const pct = Math.min(100, (cleared / 20) * 100);
            return (
              <div key={id} className={styles.walletProgressItem}>
                <div className={styles.walletProgressHead}>
                  <span>{level.name}</span>
                  <span>Stage {cleared} / 20</span>
                </div>
                <div className={styles.walletProgressTrack}>
                  <div className={styles.walletProgressFill} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </section>

        <div className={styles.walletActions}>
          <button
            className={styles.walletPrimaryBtn}
            onClick={startWithdraw}
            disabled={pending <= 0 || phase === "confirming" || !isConnected}
            type="button"
          >
            Withdraw SWD
          </button>
          <Link href="/Game/level?mode=earn">
            <button className={styles.walletSecondaryBtn} type="button">
              Earn more
            </button>
          </Link>
          <Link href="/Marketplace">
            <button className={styles.walletSecondaryBtn} type="button">
              Browse NFTs
            </button>
          </Link>
        </div>

        <div className={styles.walletPanels}>
          <section className={styles.walletPanel}>
            <div className={styles.walletPanelHead}>
              <h2>NFTs owned</h2>
              <Link href="/Marketplace">Marketplace</Link>
            </div>
            {owned.length === 0 ? (
              <div className={styles.walletEmpty}>
                <p>No items in this wallet yet.</p>
                <span>Characters, hints, and letter packs appear here after an on-chain purchase.</span>
                <Link href="/Marketplace">Go to shop</Link>
              </div>
            ) : (
              <div className={styles.walletNftGrid}>
                {owned.map((item) => (
                  <div key={item.id} className={styles.walletNftCard}>
                    <div className={styles.nftArtWrap}>
                      <img src={item.image} alt={item.name} className={styles.nftArt} />
                    </div>
                    <p className={styles.rarity}>{item.rarity}</p>
                    <h3>{item.name}</h3>
                    <p>x{item.owned} · {item.type}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className={styles.walletPanel}>
            <div className={styles.walletPanelHead}>
              <h2>Game history</h2>
              <Link href="/Game/level?mode=earn">Play</Link>
            </div>
            {history.length === 0 ? (
              <div className={styles.walletEmpty}>
                <p>No stages recorded yet.</p>
                <span>Finish a puzzle to see score, time, and SWD earned.</span>
                <Link href="/Game/level?mode=earn">Start a stage</Link>
              </div>
            ) : (
              <div className={styles.walletTable}>
                {history.slice(0, 8).map((game) => (
                  <div key={game.id} className={styles.walletTableRow}>
                    <div>
                      <strong>{LEVELS[game.level as LevelId]?.name}</strong>
                      <span>Stage {game.stage}</span>
                    </div>
                    <span>{game.score} pts</span>
                    <span className={game.completed ? styles.walletPositive : styles.walletMuted}>
                      {game.completed ? `+${game.swd} SWD` : "Incomplete"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <section className={styles.walletPanel}>
          <div className={styles.walletPanelHead}>
            <h2>Transactions</h2>
          </div>
          {txs.length === 0 ? (
            <div className={styles.walletEmpty}>
              <p>No blockchain activity yet.</p>
              <span>Withdrawals and NFT purchases will show pending → confirmed here.</span>
            </div>
          ) : (
            <div className={styles.walletTable}>
              {txs.map((tx) => (
                <div key={tx.createdAt + tx.kind} className={styles.walletTableRow}>
                  <strong>{tx.kind}</strong>
                  <span className={styles.walletMuted}>{tx.status}</span>
                  <span>{tx.amount} SWD</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
