import React from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css'
import Level1 from './images/pngs/level1.png';
import Level2 from './images/pngs/level2.png';
import Level3 from './images/pngs/level3.png';

const Levels: React.FC = () => {
  return (
    <div className={styles.levelCtn}>
      <p className={styles.levelText}>Levels of games</p>
      <p className={styles.levelsSmalls}> Our puzzle game is designed to provide hours of fun and entertainment for players of all levels ranging from beginners to intermediate and also, expert level.</p>
      <div className={styles.levelTypesCtn}>
        <div className={styles.levelTypes}>
          <div className={styles.img}>
            <Image src={Level1} alt="Logo" />
            {/* <img src="../../../assets/images/pngs/level1.png" alt="" /> */}
        </div>
          <p className={styles.levelName}>Beginner</p>
        </div>
        <div className={styles.levelTypes}>
        <div className={styles.img}>
            <Image src={Level2} alt="Logo" />
            {/* <img src="../../../assets/images/pngs/level2.png" alt="" /> */}
        </div>
          <p className={styles.levelName}>Intermediate</p>
        </div>
        <div className={styles.levelTypes}>
        <div className={styles.img}>
            <Image src={Level3} alt="Logo" />
            {/* <img src="../../../assets/images/pngs/level3.png" alt="" /> */}
        </div>
          <p className={styles.levelName}>Expert</p>
        </div>
      </div>
    </div>
);
};

export default Levels;







