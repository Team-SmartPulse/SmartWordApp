import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import Jumbotron from "../Components/Jumbotron";
import Levels from "../Components/Levels";
import AboutUs from "../Components/AboutUs";
import PlayforFree from "../Components/PlayforFree";
import PlaytoEarn from "../Components/PlaytoEarn";
import ReadyToPlay from "../Components/ReadyToPlay";
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Jumbotron />
      <AboutUs />
      <Levels />
      <PlayforFree />
      <PlaytoEarn />
      <ReadyToPlay />
      <Footer />
    </div>
  );
};

export default Home;
