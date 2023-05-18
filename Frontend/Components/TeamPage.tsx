import React from "react";
import Head from "next/head";
import png1 from "./images/pngs/mary.png";
import png2 from "./images/pngs/sabastine.png";
import png4 from "./images/pngs/roohemah.png";
import png5 from "./images/pngs/divine.png";
import png6 from "./images/pngs/favour.png";
import png7 from "./images/pngs/idy.png";
import png8 from "./images/pngs/shellyna.png";
import png9 from "./images/pngs/dunnie.png";
import png10 from "./images/pngs/folasewa.png";
import png11 from "./images/pngs/maryam.png";
import Image from "next/image";
import styles from "../styles/Home.module.css";
const TeamPage: React.FC = () => {
  return (
    <div className={styles.teamCtn}>
      <h1 className={styles.titleCtn}>Team</h1>
      <p className={styles.description}>
        Our team is made of smart & experienced talents ready to solve
        problems.We have worked hard to create a wide variety of puzzles that
        cater to different skill levels and interests. From simple jigsaw
        puzzles to complex brain teasers, we have something for everyone.
      </p>
      <div className={styles.teamContainer}>
        <div className={styles.members}>
          <div className={styles.imgCtn}>
            {/* <Image src={png1} alt="avatar" width={200} height={200} /> */}
          </div>
          <p className={styles.memberName}>Mary Godfrey</p>
          <p className={styles.memberRole}>Product Manager</p>
        </div>
        <div className={styles.members}>
          <div className={styles.mary}>
            {/* <Image src={png2} alt="avatar" width={200} height={200} /> */}
          </div>
          <p className={styles.memberName}>Mary Sabastine</p>
          <p className={styles.memberRole}>Digital Marketer</p>
        </div>
        <div className={styles.members}>
          <div className={styles.roohemah}>
            {/* <Image src={png4} alt="avatar" width={200} height={200} /> */}
          </div>
          <p className={styles.memberName}>Abolare Roohemah</p>
          <p className={styles.memberRole}>Frontend Developer</p>
        </div>
        <div className={styles.members}>
          <div className={styles.divine}>
            {/* <Image src={png5} alt="avatar" width={200} height={200} /> */}
          </div>
          <p className={styles.memberName}>Divine Attah</p>
          <p className={styles.memberRole}>Frontend Developer</p>
        </div>
        <div className={styles.members}>
          <div className={styles.favour}>
            {/* <Image src={png6} alt="avatar" width={200} height={200} /> */}
          </div>
          <p className={styles.memberName}>Adjushi Akpevwe Favour</p>
          <p className={styles.memberRole}>Frontend Developer</p>
        </div>
        <div className={styles.members}>
          <div className={styles.idy}>
            {/* <Image src={png7} alt="avatar" width={200} height={200} /> */}
          </div>
          <p className={styles.memberName}>Idongesit Ukpong</p>
          <p className={styles.memberRole}>Backend Developer</p>
        </div>
        <div className={styles.members}>
          <div className={styles.shellyna}>
            {/* <Image src={png8} alt="avatar" width={200} height={200} /> */}
          </div>
          <p className={styles.memberName}>Shelynna</p>
          <p className={styles.memberRole}>Backend Developer</p>
        </div>
        <div className={styles.members}>
          <div className={styles.dunnie}>
            {/* <Image src={png9} alt="avatar" width={200} height={200} /> */}
          </div>
          <p className={styles.memberName}>Dunnie</p>
          <p className={styles.memberRole}>Solidity Developer</p>
        </div>
        <div className={styles.members}>
          <div className={styles.folasewa}>
            {/* <Image src={png10} alt="avatar" width={200} height={200} /> */}
          </div>
          <p className={styles.memberName}>Folasewa Ogunsola</p>
          <p className={styles.memberRole}>Product Designer</p>
        </div>
        <div className={styles.members}>
          <div className={styles.maryam}>
            {/* <Image src={png11} alt="avatar" width={200} height={200} /> */}
          </div>
          <p className={styles.memberName}>Imran Maryam</p>
          <p className={styles.memberRole}>Product Designer</p>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
