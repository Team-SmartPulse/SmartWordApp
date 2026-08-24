import React from "react";
import { FaTwitter, FaDiscord, FaTelegram } from "react-icons/fa";
import { BsMedium } from "react-icons/bs";
import styles from "../styles/Home.module.css";
import { Header } from "./Header";
import Footer from "./Footer";

const CommunityPage = () => {
  return (
    <>
      <Header />
      <section className={styles.community}>
        <div className={styles["socialHandles"]}>
          <a
            href="https://twitter.com/Smartwordgame?t=U61PI3aZMVLS9pb5GSWaWw&s=08"
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter className={styles.socialIcon} /> <span>Twitter</span>
          </a>
          <a href="https://discord.com" target="_blank" rel="noreferrer">
            <FaDiscord className={styles.socialIcon} /> <span>Discord</span>
          </a>
          <a href="https://t.me" target="_blank" rel="noreferrer">
            <FaTelegram className={styles.socialIcon} /> <span>Telegram</span>
          </a>
          <a href="https://medium.com" target="_blank" rel="noreferrer">
            <BsMedium className={styles.socialIcon} />
            <span>Medium</span>
          </a>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CommunityPage;
