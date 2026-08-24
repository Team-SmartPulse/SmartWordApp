import React from "react";
import Link from "next/link";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import styles from "../styles/Home.module.css";

export default function Custom404() {
  return (
    <div className={styles.notFoundPage}>
      <Header />
      <main className={styles.notFoundMain}>
        <p className={styles.notFoundCode}>404</p>
        <h1 className={styles.notFoundTitle}>This page got scrambled</h1>
        <p className={styles.notFoundText}>
          The letters are here, but they do not spell a real route. Try one of
          these instead.
        </p>
        <div className={styles.notFoundActions}>
          <Link href="/">
            <button className={styles.playBtn}>Home</button>
          </Link>
          <Link href="/Game/level">
            <button className={styles.playBtn}>Play</button>
          </Link>
          <Link href="/Marketplace">
            <button className={styles.playBtn}>Marketplace</button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
