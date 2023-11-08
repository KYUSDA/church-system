import { Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useLogout } from "../../hooks/userLogouthook";
import { useAuthContext } from "../../context/useAuthcontext";
import "./Navbar.scss";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import Kyusda from "../../assets/kyusda logo.png";
import "../../style.css";
import { FaFacebookSquare, FaYoutube, FaTwitter } from "react-icons/fa";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    console.log("logged out");
    logout();
  };
  const logOutbutton = (
    <Typography onClick={() => handleLogout()}>LOGOUT</Typography>
  );
  return (
    <header id="main-header">
      <div className="rows">
        <div className="top-row-one">
          <div className="social-links">
            <a
              href="https://www.facebook.com/KYUSDANewYork/"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookSquare
                style={{
                  color: "white",
                  borderRadius: "50%",
                  width: "30px",
                  height: "40px",
                }}
              />
            </a>
            <a href="https://twitter/kyusda/" target="_blank" rel="noreferrer">
              <FaTwitter
                style={{
                  color: "white",
                  borderRadius: "50%",
                  width: "30px",
                  height: "40px",
                }}
              />
            </a>
            <a
              href="https://www.youtube.com/@kyusdachurch"
              target="_blank"
              rel="noreferrer"
            >
              <FaYoutube
                style={{
                  color: "white",
                  borderRadius: "50%",
                  width: "30px",
                  height: "40px",
                }}
              />
            </a>
          </div>
          <div className="upcoming-events">
            <p>Upcoming Event</p>
            <p id="countdown">
              <span id="days">00</span> <br />
              <span id="hours">00</span>
              <span id="mins">00</span>
              <span id="secs">00</span>
            </p>
            <Link to="#events">READ MORE</Link>
          </div>
          <div className="register-btn">
            <Link to="/signUp" style={{ marginRight: "20px" }}>
              Register Membership
            </Link>
            <Link to="/signIn">Login</Link>
          </div>
        </div>
        <div className="top-row-two">
          <div className="logo">
            <a href="index.html">
              <img src="img/kyusdalogo.png" alt="kyusda logo" />
              <span>KYUSDA CHURCH</span>
            </a>
          </div>
          <div className="nav-links">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/families">Families</Link>
              </li>
              <li>
                <Link to="/departments">Departments</Link>
              </li>
            </ul>
          </div>
          <div class="donate-btn">
            <Link to="/donation">Send Donation</Link>
          </div>
        </div>
      </div>
      <div className="hero-section">
        <div className="hero-text">
          <h1>WELCOME TO KYUSDA CHURCH</h1>
          <p>
            Christ was a Seventh-Day Adventist,
            <br /> to all intents and purposes. <br />
            (Medical Ministry 49.4)
          </p>
          <Link to="/about-section">
            About Us <i class="fa fa-angle-down"></i>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
