import React from 'react';
import Image from 'next/image';
import Link from 'next/link'
import styles from '../../styles/Home.module.css';
import Dropdown from '../../Components/images/pngs/discArrowDown.png';
import firstIcon from '../../Components/images/pngs/firstDisc.png';
import secondIcon from '../../Components/images/pngs/secondDisc.png';
import thirdIcon from '../../Components/images/pngs/thirdDisc.png';
import fourthIcon from '../../Components/images/pngs/fourthDisc.png';
import fifthIcon from '../../Components/images/pngs/lastDisc.png';
import Coin from '../../Components/images/pngs/discCoin.png';

const Header: React.FC = () => {
  return (
    <div className={styles.discoverCtn}>
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
        <p className={styles.popularText}>Popular Collections</p>
        <table>
            <thead>
                <tr>
                    <td>Projects</td>
                    <td>CHAIN</td>
                    <td>LAUNCHED</td>
                    <td>TOTAL RAISED</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div className="icon-div">
                            <Image src={firstIcon} />
                        </div>
                        <div className="text-div">
                            <p>WordPlay</p>
                            <p>Price = $1.88</p>
                        </div>
                    </td>
                    <td>
                        <Image src={Coin} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="icon-div">
                            <Image src={secondIcon} />
                        </div>
                        <div className="text-div">
                            <p>WordPlay</p>
                            <p>Price = $1.88</p>
                        </div>
                    </td>
                    <td>
                        <Image src={Coin} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="icon-div">
                            <Image src={thirdIcon} />
                        </div>
                        <div className="text-div">
                            <p>WordPlay</p>
                            <p>Price = $1.88</p>
                        </div>
                    </td>
                    <td>
                        <Image src={Coin} />
                    </td>

                </tr>
                <tr>
                    <td>
                        <div className="icon-div">
                            <Image src={fourthIcon} />
                        </div>
                        <div className="text-div">
                            <p>WordPlay</p>
                            <p>Price = $1.88</p>
                        </div>
                    </td>
                    <td>
                        <Image src={Coin} />
                    </td>

                </tr>
                <tr>
                    <td>
                        <div className="icon-div">
                            <Image src={fifthIcon} />
                        </div>
                        <div className="text-div">
                            <p>WordPlay</p>
                            <p>Price = $1.88</p>
                        </div>
                    </td>
                    <td>
                        <Image src={Coin} />
                    </td>

                </tr>
            </tbody>
        </table>
      </div>
  </div>
);
};

export default Header;







