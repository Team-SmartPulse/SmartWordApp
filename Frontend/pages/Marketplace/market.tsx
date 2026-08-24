import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
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
import Shop from "../../Components/Shop";

const Market: React.FC = () => {
  return (
    <div className={styles.marketCtn}>
      <div className={styles.marketJumboCtn}>
        <div>
          <p className={styles.marketText}>
            Collect extraordinary SmartWord NFTs
          </p>
          <p className={styles.belowMarketText}>
            Digital items for SmartWord — characters, power-ups, and letter
            packs, priced in SWD.
          </p>
          <div className={styles.buttonsCtn}>
            <Link href="/Marketplace/discover">
              <button>
                <Image src={Send} alt="Discover" />
                <span>Discover</span>
              </button>
            </Link>
            <Link href="#create">
              <button>
                <Image src={Plus} alt="Create" />
                <span>Create New</span>
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.webIcon}>
        <Image src={WebIcon} alt="Web3" />
        </div>
      </div>
      <div className={styles.belowJumboCtn}>
        <div className={styles.statsCtn}>
          <div>
            <p>SWD shop</p>
            <p>9 items</p>
          </div>
          <div>
            <p>Floor Price</p>
            <p>
              <span className={styles.coinIconCtn}>
                <Image src={Coin} alt="coin" />
              </span>
              On-chain
            </p>
          </div>
          <div>
            <p>Boosters</p>
            <p>Hint · Life · Star · Theme</p>
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
        <Shop />
      </div>
    </div>
  );
};

export default Market;
