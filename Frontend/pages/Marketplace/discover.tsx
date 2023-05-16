import React from 'react';
import Image from 'next/image';
import Link from 'next/link'
import styles from '../../styles/Home.module.css';
import Dropdown from '../../Components/images/pngs/discArrowDown.png';
import Discover from '../../Components/Discover'
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';

const DiscoverPage: React.FC = () => {
  return (
    <div className={styles.discoverCtn}>
        <Header />
      <div className={styles.bannerCtn}>
        <p className={styles.popularText}>Popular Collection</p>
      </div>
      <div className={styles.belowBannerCtn}>
        <div className={styles.inputCtn}>
            <select className={styles.input}>
                <option>All Categories</option>
            </select>
            <div className={styles.discDropdown}>
            <Image src={Dropdown} alt="dropdown" />
            </div>
        </div>
        <Discover />
      </div>
      <Footer />
  </div>
);
};

export default DiscoverPage;







