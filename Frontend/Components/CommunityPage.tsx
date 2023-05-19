import Link from "next/link";
import React from "react";
import { FaTwitter, FaDiscord, FaTelegram } from "react-icons/fa";
import { BsMedium } from "react-icons/bs";
import styles from "../styles/Home.module.css";

const CommunityPage = () => {
  return (
    <section className={styles.community}>
      <div className={styles["socialHandles"]}>
        <a
          href="https://twitter.com/Smartwordgame?t=U61PI3aZMVLS9pb5GSWaWw&s=08"
          target="_blank"
        >
          <FaTwitter className={styles.socialIcon} /> <span>Twitter</span>
        </a>
        <a href="" target="_blank">
          <FaDiscord className={styles.socialIcon} /> <span>Discord</span>
        </a>
        <a href="" target="_blank">
          <FaTelegram className={styles.socialIcon} /> <span>Telegram</span>
        </a>
        <a href="" target="_blank">
          <BsMedium className={styles.socialIcon} />
          <span>Medium</span>
        </a>
      </div>
    </section>
  );
};

export default CommunityPage;
