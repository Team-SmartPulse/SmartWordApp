import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import Dropdown from "../../Components/images/pngs/discArrowDown.png";
import Send from "../../Components/images/pngs/Send.png";
import Plus from "../../Components/images/pngs/PlusIcon.png";
import WebIcon from "../../Components/images/pngs/web3Icon.png";
import Coin from "../../Components/images/pngs/discCoin.png";
import ArrowLeft from "../../Components/images/pngs/toLeftArrow.png";
import ArrowRight from "../../Components/images/pngs/toRightArrow.png";
import Basket from "../../Components/images/pngs/basketIcon.png";
import Coins from "../../Components/images/pngs/coins.png";
import Tiny1 from "../../Components/images/pngs/tiny1.png";
import Tiny2 from "../../Components/images/pngs/tiny2.png";
import Tiny3 from "../../Components/images/pngs/tiny3.png";
import Discover from "../../Components/Discover";
import Footer from "../../Components/Footer";

const Market: React.FC = () => {
  return (
    <div className={styles.marketCtn}>
      <div className={styles.marketJumboCtn}>
        <div>
          <p className={styles.marketText}>
            Collect The Awesome Extaordinary NFTs
          </p>
          <p className={styles.belowMarketText}>
            Digital marketplace for crypto collectibles and non-fungible tokens,
            NFTs
          </p>
          <div className={styles.buttonsCtn}>
            <Link href="/Marketplace/discover">
              <button>
                <Image src={Send} />
                <span>Discover</span>
              </button>
            </Link>
            <Link href="/">
              <button>
                <Image src={Plus} />
                <span>Create New</span>
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.webIcon}>
          <Image src={WebIcon} />
        </div>
      </div>
      <div className={styles.belowJumboCtn}>
        <div className={styles.statsCtn}>
          <div>
            <p>Total Supply</p>
            <p>27865</p>
          </div>
          <div>
            <p>Floor Price</p>
            <p>
              <span className={styles.coinIconCtn}>
                <Image src={Coin} />
              </span>
              200
            </p>
          </div>
          <div>
            <p>Highest (24H)</p>
            <p>27865</p>
          </div>
        </div>
        <div className={styles.startersCtn}>
          <div className={styles.absCtn}>Starters Kit</div>
          <div className={styles.flexCtn}>
            <div className={styles.arrowPointCtn}>
              <Image src={ArrowLeft} />
            </div>
            <div className={styles.midStatCtn}>
              <div>
                <Image src={Basket} />
              </div>
              <div className={styles.beforeTinyCtn}>
                <Image src={Coins} />
                <span>600</span>
              </div>
              <div className={styles.tinyCtn}>
                <div>
                  <Image src={Tiny1} />
                  <span>x1</span>
                </div>
                <div>
                  <Image src={Tiny2} />
                  <span>x1</span>
                </div>
                <div>
                  <Image src={Tiny3} />
                  <span>x1</span>
                </div>
              </div>
            </div>
            <div className={styles.arrowPointCtn}>
              <Image src={ArrowRight} />
            </div>
          </div>
        </div>
        <Discover />
      </div>
    </div>
  );
};

export default Market;
