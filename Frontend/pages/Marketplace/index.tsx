import React from "react";
import Footer from "../../Components/Footer";
import MarketPlaceHeader from "../../Components/MarketPlaceHeader";
import Market from "./market";

const MarketplacePage = () => {
  return (
    <div>
      <MarketPlaceHeader />
      <Market />
      <Footer />
    </div>
  );
};

export default MarketplacePage;
