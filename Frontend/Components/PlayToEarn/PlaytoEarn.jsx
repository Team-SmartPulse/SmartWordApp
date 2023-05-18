import React from "react";
import "./PlaytoEarn.css";
import {FaPlay} from "react-icons/fa";



function PlaytoEarn() {
  return (
    <div className="image-text-section">
      <div className="text-container">
        <h2>Play to Earn</h2>
        <p className="bridge">
          Connect your preferred cryptocurrency wallet from the available
          wallets when you sign up to earn and accumulate your rewards in
          cryptocurrency.
        </p>
        <button className="hero-btn"><FaPlay />Play to Earn</button>
      </div>

      
      <div className="img-container">
        <img src= "../images/pngs/ToEarn.png" className="ToEarn-logo" alt="img" />
      </div>
    </div>
  );
}

export default PlaytoEarn;
