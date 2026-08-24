import React from "react";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import styles from "../styles/Home.module.css";

export default function SupportPage() {
  return (
    <div>
      <Header />
      <div className={styles.stagesCtn}>
        <div className={styles.stageTextCtn}>
          <p>Support</p>
          <p>How Smart Word works</p>
        </div>
        <div className={styles.supportBody}>
          <h3>Play for free vs play to earn</h3>
          <p>
            Practice mode saves history only. Earn mode banks SWD off-chain after
            you clear a stage. Connect a wallet and withdraw to receive the ERC-20
            in your Celo account.
          </p>
          <h3>Levels and stages</h3>
          <p>
            Beginner, Intermediate, and Advanced each have 100 stages. You must
            clear them in order. Intermediate adds a timer; Advanced adds a timer
            and lives.
          </p>
          <h3>Rewards</h3>
          <p>
            First-clear SWD is computed from score, remaining time, and difficulty.
            Withdraw mints SWD via RewardVault. Marketplace items are ERC-1155 and
            cost SWD.
          </p>
          <h3>Marketplace</h3>
          <p>
            Spend SMC on hint, life, star, and theme NFTs, then list them for CELO
            if you want to sell.
          </p>
          <h3>Terms and privacy</h3>
          <p>
            This is a community game on a public blockchain. Wallet addresses and
            transactions are public. Do not share your seed phrase. Rewards on
            testnet have no cash value.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
