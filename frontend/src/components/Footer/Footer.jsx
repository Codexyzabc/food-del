import React, { useContext, useEffect } from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from "../../context/StoreContext";


const Footer = ({setFeedback}) => {

  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <Link to='/'><img src={assets.logo} alt="Logo" /></Link>
          <p>
            Craving variety? Discover a world of flavors with our diverse menu, 
            crafted to satisfy every taste bud. From comfort classics to exotic delights, 
            we've got something for everyone!
          </p>
          <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="Facebook" />
                <img src={assets.twitter_icon} alt="Twitter" />
                <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <Link to='/'><li>Home</li></Link>
                <li>About us</li>
                {/* <li>Delivery</li> */}
                <li onClick={() => setFeedback(true)}>Feedback</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 7439619245</li>
                <li>contact@foodypie.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright {new Date().getFullYear()} © FoodyPie.com. All rights reserved.</p>
    </div>
  );
};

export default Footer;
