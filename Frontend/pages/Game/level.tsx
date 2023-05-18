import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import styles from '../../styles/Home.module.css'
import Coin from '../../Components/images/pngs/coins.png';
import Star from '../../Components/images/pngs/star.png';
import Touch from '../../Components/images/pngs/touch.png';
import Bulb from '../../Components/images/pngs/bulb.png';
import PlayIcon from '../../Components/images/pngs/play.png';
import GameHeader from '../../Components/GameHeader/gameHeader';

const Level: React.FC = () => {
    const numbering = []
    for(let i=1; i <= 100; i++) {
        numbering.push(i)
    }
  return (
    <div className={styles.stagesCtn}>
        <GameHeader />
        <div className={styles.stageTextCtn}>
            <p>Game level</p>
            <p>Select prefered level to start playing</p>
        </div>
        <div className={styles.levelDiv}>
            <div>
                <p>Beginner Level</p>
                <div>
                    <div className={styles.periDiv}>
                        <Image src={Coin} />
                        <p>100 SMC</p>
                    </div>
                    <div className={styles.levelPeriDiv}>
                        <div>
                            <div><Image src={Bulb} /></div>
                            <p>x1</p>
                        </div>
                        <div>
                            <Image src={Touch} />
                            <p>x1</p>
                        </div>
                        <div>
                        <Image src={Star} />
                            <p>x1</p>
                        </div>
                    </div>
                    <Link href="/Game/stages">
                        <button className={styles.playBtn}>
                        <Image src={PlayIcon} alt="Logo"  />
                        {/* <img src="../../../assets/images/pngs/play.png" alt="" /> */}
                        Play
                        </button>
                    </Link>
                </div>
            </div>
            <div>
                <p>Intermediate Level</p>
                <div>
                    <div className={styles.periDiv}>
                        <Image src={Coin} />
                        <p>100 SMC</p>
                    </div>
                    <div className={styles.levelPeriDiv}>
                        <div>
                            <div><Image src={Bulb} /></div>
                            <p>x1</p>
                        </div>
                        <div>
                            <Image src={Touch} />
                            <p>x1</p>
                        </div>
                        <div>
                        <Image src={Star} />
                            <p>x1</p>
                        </div>
                    </div>
                    <Link href="/Game/stages">
                        <button className={styles.playBtn}>
                        <Image src={PlayIcon} alt="Logo"  />
                        {/* <img src="../../../assets/images/pngs/play.png" alt="" /> */}
                        Play
                        </button>
                    </Link>
                </div>
            </div>
            <div>
                <p>Advanced Level</p>
                <div>
                    <div className={styles.periDiv}>
                        <Image src={Coin} />
                        <p>100 SMC</p>
                    </div>
                    <div className={styles.levelPeriDiv}>
                        <div>
                            <div><Image src={Bulb} /></div>
                            <p>x1</p>
                        </div>
                        <div>
                            <Image src={Touch} />
                            <p>x1</p>
                        </div>
                        <div>
                        <Image src={Star} />
                            <p>x1</p>
                        </div>
                    </div>
                    <Link href="/Game/stages">
                        <button className={styles.playBtn}>
                        <Image src={PlayIcon} alt="Logo"  />
                        {/* <img src="../../../assets/images/pngs/play.png" alt="" /> */}
                        Play
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
);
};

export default Level;







