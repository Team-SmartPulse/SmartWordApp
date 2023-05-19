import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import styles from '../styles/Home.module.css'
import PlayIcon from './images/pngs/Play.png';
import HeroImg from './images/pngs/hero-img.png';

const Jumbotron: React.FC = () => {
  return (
    <div className={styles.jumbotronCtn}>
        <div className={styles.textCtn}>
            <p className={styles.extra}>Extraordinary Creative Puzzle <br /><span>Games</span></p>
            <p className={styles.belowExtra}>Start winning with the most exclusive crypto</p>
            <Link href="/Game"><button className={styles.demoBtn}>
                <Image src={PlayIcon} alt="Logo"  />
                {/* <img src="../../../assets/images/pngs/play.png" alt="" /> */}
                Play Demo
            </button></Link>
        </div>
        <div className={styles.heroImgCtn}>
            <Image src={HeroImg} alt="hero image" />
            {/* <img src="../../../assets/images/pngs/hero-img.png" alt="" /> */}
        </div>
    </div>
);
};

export default Jumbotron;







