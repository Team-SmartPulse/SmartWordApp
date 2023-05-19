import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Jumbotron from "../Components/Jumbotron";
import Levels from "../Components/Levels";
import { LandingPage1 } from "../Components/LandingPage1";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <LandingPage1 />
      <Jumbotron />
      <Levels />
      <Footer />
    </div>
  );
};

export default Home;
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { LandingPage1 } from "../Components/LandingPage1";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
        <LandingPage1 />
        <Footer />
    </div>
  );
};

export default Home;
