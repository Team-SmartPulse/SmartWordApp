import React from "react";
import Footer from "../Components/Footer";
import MarketPlaceHeader from "../Components/MarketPlaceHeader";
import Market from "./Marketplace/market";

const marketPlace = () => {
  return (
    <div>
      <MarketPlaceHeader />
      <Market />
      <Footer />
    </div>
  );
};

export default marketPlace;
