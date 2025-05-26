import React from "react";
import "./AppDownload.css";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <>
      <div className="about-us-container" id="about-us">
        <h2>About Us</h2>
        <div className="about-us">
          <p className="about-us-description">
            Welcome to FoodyPie, your trusted online destination for ordering
            delicious meals directly from your favorite restaurant! <br />
            <br />
            Founded in 2025, our mission is simple: to bring the authentic taste
            of your go-to restaurant to your doorstep with just a few clicks. We
            are not a generic food aggregator — we are a dedicated platform that
            connects you exclusively to a single restaurant, ensuring consistent
            quality, flavor, and service every time you order. <br />
            <br />
            At FoodyPie, great food is just the beginning — it’s the experience
            that matters. <br />
            <br />
            Join us in celebrating food made with passion. Order now and enjoy the
            comfort of your favorite restaurant at home!
          </p>
          <img className="about-us-pic" src={assets.about_us} alt="About Us" />
        </div>  
      </div>

      <div className="app-download" id="app-download">
        <p>
          For Better Experience Download <br />
          FoodyPie App
        </p>
        <div className="app-download-platforms">
          <img src={assets.play_store} alt="Play Store" />
          <img src={assets.app_store} alt="App Store" />
        </div>
      </div>
    </>
  );
};

export default AppDownload;
