import React from "react";
import "./AboutUs.css";

//const AboutUs = () => {
//return (
//<div className="about-us-section">
//<h2>About Us</h2>
//<p>We are passionate about creating puzzles that challenge and engage our players,
// while also providing a relaxing and enjoyable experience.</p>
// </div>
//);
//};

function Card(props) {
  return (
    <div className="card">
      <img src={props.image} alt={props.alt} className="card-image" />
      <div className="card-content">
        <h3 className="card-header">{props.header}</h3>
        <p className="card-text">{props.text}</p>
      </div>
    </div>
  );
}

function AboutUs() {
  return (
    <div className="about-us-container">
      <h1 className="about-us-header">About Us</h1>
      <p>
        We are passionate about creating puzzles that challenge and engage our
        players, while also providing a relaxing and enjoyable experience.
      </p>
      <div className="card-container">
        <Card
          image="../images/pngs/Decentralized.png"
          alt="Img"
          header="Decentralized Nature"
          text="Players have full control over their digital assets and rewards and also
          provides a high level of security and transparency."
        />

        <Card
          image="../images/pngs/ConnectWallet.png"
          alt="Img"
          header="Connect Wallet to Play"
          text="Deliver education and training
           to a wide audience, while overcoming the 
            limitations of physical location."
        />

        <Card
          image="../images/pngs/SolvePuzzle.png"
          alt="Img"
          header="Solve Puzzle"
          text="Develop and deliver course content online to students who are 
           interested in learning about a particular subject."
        />

        <Card
          image="../images/pngs/EarnCrypto.png"
          alt="Img"
          header="Earn in Cryptocurrency"
          text="Earn rewards that can be used to buy 
           hints, boosters or cashout to other cryptocurriencies."
        />
      </div>
    </div>
  );
}

//</div>
//<div className="section-container">
//<h2 className="section-header">Connect Wallet to Play</h2>
//<p className="section-description">Deliver education and training
// to a wide audience, while overcoming the
// limitations of physical location.
//</p>
//</div>
//<div className="section-container">
// <h2 className="section-header">Solve Puzzle</h2>
// <p className="section-description">Develop and deliver course content online to students who are
//interested in learning about a particular subject.
//</p>
//</div>
//<div className="section-container">
// <h2 className="section-header">Earn in Cryptocurrency</h2>
//<p className="section-description">Earn rewards that can be used to buy
// hints, boosters or cashout to other cryptocurriencies.
//</p>
//</div>
//</div>
// );
// };

export default AboutUs;
