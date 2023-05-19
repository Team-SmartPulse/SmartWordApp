import React from "react";
import "./ReadyToPlay.css";

//function ReadyToPlay() {
// return (
// <div className="ReadyToPlay-container">
// <div className="text-container">
// <h2>Ready to Start Playing</h2>
//<p className="bridge">Enjoy the Best gaming experience.</p>
//<button className="hero-btn">Connect Wallet</button>
//</div>
//</div>
//);
//}
function ReadyToPlay() {
  return (
    <div className="ready-to-play-container">
      <h1 className="ready-to-play-header">Ready to Start Playing?</h1>
      <div className="content-container">
        <p className="text">Enjoy the Best gaming experience.</p>
        <button className="hero-boton">Connect Wallet</button>
      </div>
    </div>
  );
}

export default ReadyToPlay;
