import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Header } from "../Components/Header";
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
