import React from 'react';
import Image from 'next/image';
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import smartWordLogo from './images/pngs/smart-word-logo.png';

const Header: React.FC = () => {
  return (
    <div className={styles.headerCtn}>
      <div className={styles.logoCtn}>
        <Image src={smartWordLogo} alt="Logo" />
      </div>
      <div className={styles.linksCtn}>
        <Link href="/" className={styles.linkTags}>
          Home
        </Link>
        <Link href="/Game" className={styles.linkTags}>
          Games
        </Link>
        <Link href="/Marketplace" className={styles.linkTags}>
          Marketplace
        </Link>
        <Link href="/team" className={styles.linkTags}>
          Team
        </Link>
        <Link href="/community" className={styles.linkTags}>
          Community
        </Link>
      </div>
      <div className="btn-div">
        <ConnectButton />
      </div>
  </div>
);
};

export default Header;







