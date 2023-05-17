import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import styles from '../../styles/Home.module.css'
import PlayIcon from './images/pngs/play.png';
import StageImg from '../../Components/images/pngs/stageIcon.png';
import GameHeader from '../../Components/GameHeader/gameHeader';

const Stages: React.FC = () => {
    const numbering = []
    for(let i=1; i <= 100; i++) {
        numbering.push(i)
    }
  return (
    <div className={styles.stagesCtn}>
        <GameHeader />
        <div className={styles.stageTextCtn}>
            <p>Beginner level</p>
            <p>Choose stage</p>
        </div>
        <div className={styles.stageDiv}>
            {numbering.map(number => 
                <div className={styles.stages} key={number} >
                    <Image src={StageImg} />
                    <p>Stage {number}</p>
                </div>
            )}
        </div>
    </div>
);
};

export default Stages;







