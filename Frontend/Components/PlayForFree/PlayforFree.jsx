import React from "react";
import "./PlayforFree.css";
import {FaPlay} from "react-icons/fa";


function PlayforFree() {
  return (
    <div className="image-section">
      <div className="heading-container">
        <h2>Play for Free</h2>
        <p className="letters">
          Enjoy the best and most fun gaming experience when you play games for
          free.
        </p>
        <button className="hero-button"><FaPlay />Play for Free</button>
        
        
      </div>
      <div className="image-container">
        <img src= "../images/pngs/ForFree.png" className="ForFree-logo" alt="img" />
      </div>
    </div>
  );
}

export default PlayforFree;
