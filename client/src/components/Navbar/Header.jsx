import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import KyuSda from "../../assets/kyusdaLogo.png";
import "../../style.css";
import { FaFacebookSquare, FaYoutube, FaTwitter } from "react-icons/fa";

const Header = () => {
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
            <Link to="/">
              <img src={KyuSda} alt="kyusda logo" />
              <span>KYUSDA CHURCH</span>
            </Link>
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
          <div className="donate-btn">
            <Link to="/donation">Send Donation</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
