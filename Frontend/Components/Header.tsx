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
      <Image src={smartWordLogo} alt="Logo"  />
    </div>
    <div className={styles.linksCtn}>
      <Link href="/">
        <a className={styles.linkTags}>Home</a>
      </Link>
      <Link href="/games">
        <a className={styles.linkTags}>Games</a>
      </Link>
      <Link href="/marketplace">
        <a className={styles.linkTags}>Marketplace</a>
      </Link>
      <Link href="/team">
        <a className={styles.linkTags}>Team</a>
      </Link>
      <Link href="/community">
        <a className={styles.linkTags}>Community</a>
      </Link>
      <ConnectButton />
    </div>
  </div>
);
};

export default Header;







