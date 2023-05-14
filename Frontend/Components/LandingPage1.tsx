import React from "react";
import styles from "../styles/Home.module.css";

export const LandingPage1 = () => {
  return (
    <section id={styles.heroImage}>
      <div className="hero-left">
        <span>Extraordinary</span>
        <div className="curve"></div>
        <span>Creative Puzzle</span>
      </div>
      <div className="hero-right"></div>
    </section>
  );
};
