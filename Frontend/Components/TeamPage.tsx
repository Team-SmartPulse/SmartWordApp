import React from "react";
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
          </div>
          <p className={styles.memberName}>Mary Godfrey</p>
          <p className={styles.memberRole}>Product Manager</p>
        </div>
        <div className={styles.members}>
          <div className={styles.mary}>
          </div>
          <p className={styles.memberName}>Mary Sabastine</p>
          <p className={styles.memberRole}>Digital Marketer</p>
        </div>
        <div className={styles.members}>
          <div className={styles.roohemah}>
          </div>
          <p className={styles.memberName}>Abolare Roohemah</p>
          <p className={styles.memberRole}>Frontend Developer</p>
        </div>
        <div className={styles.members}>
          <div className={styles.divine}>
          </div>
          <p className={styles.memberName}>Divine Attah</p>
          <p className={styles.memberRole}>Frontend Developer</p>
        </div>
        <div className={styles.members}>
          <div className={styles.favour}>
          </div>
          <p className={styles.memberName}>Adjushi Akpevwe Favour</p>
          <p className={styles.memberRole}>Frontend Developer</p>
        </div>
        <div className={styles.members}>
          <div className={styles.idy}>
          </div>
          <p className={styles.memberName}>Idongesit Ukpong</p>
          <p className={styles.memberRole}>Backend Developer</p>
        </div>
        <div className={styles.members}>
          <div className={styles.shellyna}>
          </div>
          <p className={styles.memberName}>Shelynna</p>
          <p className={styles.memberRole}>Backend Developer</p>
        </div>
        <div className={styles.members}>
          <div className={styles.dunnie}>
          </div>
          <p className={styles.memberName}>Dunnie</p>
          <p className={styles.memberRole}>Solidity Developer</p>
        </div>
        <div className={styles.members}>
          <div className={styles.folasewa}>
          </div>
          <p className={styles.memberName}>Folasewa Ogunsola</p>
          <p className={styles.memberRole}>Product Designer</p>
        </div>
        <div className={styles.members}>
          <div className={styles.maryam}>
          </div>
          <p className={styles.memberName}>Imran Maryam</p>
          <p className={styles.memberRole}>Product Designer</p>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
