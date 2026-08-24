import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import smartWordLogo from "./images/pngs/smart-word-logo.png";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import celo from "./images/pngs/celo.png";

const Footer: React.FC = () => {
  return (
    <div className={styles.footerCtn}>
      <div className={styles.footerTopDiv}>
        <div className={styles.logoDiv}>
          <Image src={smartWordLogo} alt="Logo" width={120} height={40} />
          <div className={styles.socialsDiv}>
            <a href="https://twitter.com/Smartwordgame" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <FaFacebook />
            <FaLinkedin />
            <FaInstagram />
          </div>
        </div>
        <div className={styles.linksDiv}>
          <p className={styles.linkHeader}>Company</p>
          <Link href="/team">
            <p className={styles.links}>Team</p>
          </Link>
          <Link href="/community">
            <p className={styles.links}>Contact us</p>
          </Link>
          <Link href="/Marketplace">
            <p className={styles.links}>Marketplace</p>
          </Link>
        </div>
        <div className={styles.linksDiv}>
          <p className={styles.linkHeader}>Powered by</p>
          <p className={`${styles.links} ${styles.imgLinks}`}>
            <Image src={celo} alt="Celo" width={24} height={24} />
            <span>Celo</span>
          </p>
        </div>
        <div className={styles.linksDiv}>
          <p className={styles.linkHeader}>Support</p>
          <Link href="/support">
            <p className={styles.links}>FAQs</p>
          </Link>
          <Link href="/support">
            <p className={styles.links}>Terms of use</p>
          </Link>
          <Link href="/support">
            <p className={styles.links}>Privacy policy</p>
          </Link>
        </div>
      </div>
      <div className={styles.copyDiv}>
        <p className={styles.copyText}>&copy; {new Date().getFullYear()} smartword. All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
