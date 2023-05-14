import React from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import smartWordLogo from './images/pngs/smart-word-logo.png';
import {FaFacebook, FaInstagram, FaLinkedin, FaTwitter} from 'react-icons/fa'
import celo from './images/pngs/celo.png';
const Footer: React.FC = ()=> {
  return (
    <div className={styles.footerCtn}>
      <div className={styles.footerTopDiv}>
        <div className={styles.logoDiv}>
          <Image
            src={smartWordLogo}
            alt="Logo"
            width={120}
            height={40}
          />
          <div className={styles.socialsDiv}>
            <FaFacebook />
            <FaLinkedin />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>
        <div className={styles.linksDiv}>
          <p className={styles.linkHeader}>Company</p>
          <p className={styles.links}>Team</p>
          <p className={styles.links}>Contact us</p>
          <p className={styles.links}>Marketplace</p>
        </div>
        <div className={styles.linksDiv}>
          <p className={styles.linkHeader}>Powered by</p>
          <p className={`${styles.links} ${styles.imgLinks}`}>
            <Image
              src={celo}
              alt="Facebook"
              width={24}
              height={24}
            />
            <span>Celo</span>
          </p>
        </div>
        <div className={styles.linksDiv}>
          <p className={styles.linkHeader}>Support</p>
          <p className={styles.links}>FAQs</p>
          <p className={styles.links}>Terms of use</p>
          <p className={styles.links}>Privacy policy</p>
        </div>
      </div>
      <div className={styles.copyDiv}>
        <p className={styles.copyText}>&copy; 2023 smartword. All rights reserved</p>
      </div>
    </div>
  );
}
export default Footer;