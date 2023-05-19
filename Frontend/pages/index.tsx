import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
<<<<<<< HEAD
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
=======
>>>>>>> 5095bb57607724c0afdd87d27d7e9c1572237ffe
import styles from "../styles/Home.module.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Jumbotron from "../Components/Jumbotron";
import Levels from "../Components/Levels";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
        <Jumbotron />
        <Levels />
        <Footer />
    </div>
  );
};

export default Home;
