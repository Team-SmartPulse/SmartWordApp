import React from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css'
import firstIcon from '../Components/images/pngs/firstDisc.png';
import secondIcon from '../Components/images/pngs/secondDisc.png';
import thirdIcon from '../Components/images/pngs/thirdDisc.png';
import fourthIcon from '../Components/images/pngs/fourthDisc.png';
import fifthIcon from '../Components/images/pngs/lastDisc.png';
import Coin from '../Components/images/pngs/discCoin.png';

const Discover: React.FC = () => {
  return (
    <div>
      <p className={styles.popularText}>Popular Collections</p>
        <table className={styles.table}>
            <thead className={styles.tableHead}>
                <tr>
                    <td>Projects</td>
                    <td>CHAIN</td>
                    <td>LAUNCHED</td>
                    <td>TOTAL RAISED</td>
                </tr>
            </thead>
            <tbody className={styles.tableBody}>
                <tr className={styles.tableRow}>
                    <td>
                        <div className="icon-div">
                            <Image src={fourthIcon} />
                        </div>
                        <div className={styles.textDiv}>
                            <p>WordPlay</p>
                            <p>Price = $1.88</p>
                        </div>
                    </td>
                    <td>
                        <Image src={Coin} />
                    </td>
                    <td>10d 0h 0m ago</td>
                    <td>$0.00(0%)</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td>
                        <div className="icon-div">
                            <Image src={thirdIcon} />
                        </div>
                        <div className={styles.textDiv}>
                            <p>Hint Box</p>
                            <p>Price = $1.88</p>
                        </div>
                    </td>
                    <td>
                        <Image src={Coin} />
                    </td>
                    <td>10d 0h 0m ago</td>
                    <td>$0.00(0%)</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td>
                        <div className={styles.iconDiv}>
                            <Image src={firstIcon} />
                        </div>
                        <div className={styles.textDiv}>
                            <p>Puzzle Theme</p>
                            <p>Price = $1.88</p>
                        </div>
                    </td>
                    <td>
                        <Image src={Coin} />
                    </td>
                    <td>10d 0h 0m ago</td>
                    <td>$0.00(0%)</td>

                </tr>
                <tr className={styles.tableRow}>
                    <td>
                        <div className={styles.iconDiv}>
                            <Image src={secondIcon} />
                        </div>
                        <div className={styles.textDiv}>
                            <p>Word Match</p>
                            <p>Price = $1.88</p>
                        </div>
                    </td>
                    <td>
                        <Image src={Coin} />
                    </td>
                    <td>10d 0h 0m ago</td>
                    <td>$0.00(0%)</td>

                </tr>
                <tr className={styles.tableRow}>
                    <td>
                        <div className={styles.iconDiv}>
                            <Image src={fifthIcon} />
                        </div>
                        <div className={styles.textDiv}>
                            <p>Crypto Puzzles</p>
                            <p>Price = $1.88</p>
                        </div>
                    </td>
                    <td>
                        <Image src={Coin} />
                    </td>
                    <td>10d 0h 0m ago</td>
                    <td>$0.00(0%)</td>

                </tr>
            </tbody>
        </table>
  </div>
);
};

export default Discover;
