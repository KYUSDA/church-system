import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import KyuSda from "../../assets/kyusdaLogo.png";
import "../../style.css";
import { FaFacebookSquare, FaYoutube, FaTwitter } from "react-icons/fa";
import { useLogout } from "../../hooks/userLogoutHook";


const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { logout } = useLogout();

  const handleLogOut = () => {
    logout();
  }

  // State for countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown target date (replace with your event date)
  const eventName = "VoP Sabbath";

  useEffect(() => {
    const eventDate = new Date("2024-11-23T00:00:00");
    const timer = setInterval(() => {
      const now = new Date();
      const difference = eventDate - now;

      if (difference <= 0) {
        clearInterval(timer); // Stop timer if the event date has passed
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
                  width: "20px",
                  height: "30px",
                }}
              />
              
            </a>
            <a
              href="https://twitter/kyusda/"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter
                style={{
                  color: "white",
                  borderRadius: "50%",
                  width: "20px",
                  height: "30px",
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
                  width: "20px",
                  height: "30px",
                }}
              />
            </a>
          </div>
          <div className="upcoming-events">
            <p>
              <strong style={{ fontSize: "12px" }}>Upcoming Event: </strong> &nbsp; &nbsp;
              <span style={{ color: "#12ac8e", fontSize: "21px" }}>{eventName}</span>
            </p>
            <p id="countdown">
              <span id="days">{timeLeft.days}</span>
              <span style={{ fontSize: "12px" }}>Days</span> <br />
              <span id="hours">{timeLeft.hours}</span>
              <span style={{ fontSize: "12px" }}>Hrs</span>{" "}
              <span id="mins">{timeLeft.minutes}</span>
              <span style={{ fontSize: "12px" }}>Mins</span>{" "}
              <span id="secs" style={{ fontSize: "34px", color: "#12ac8e" }}>{timeLeft.seconds}</span>
              <span style={{ fontSize: "12px" }}>Sec</span>
            </p>
            <Link to="#events" style={{ fontSize: "12px", color: "#12ac8e" }}>EVENTS' DETAILS</Link>
          </div>
          {
            user?.email ?
              <div className="flex justify-between items-center gap-x-3">
                <Link to="/member">Dashboard</Link>
                <button onClick={handleLogOut} className="rounded-md p-2 bg-[#12ac8e]">Log Out</button>
              </div>
              : <div className="register-btn">
                <Link to="/signUp" style={{ marginRight: "20px" }}>
                  Register Membership
                </Link>
                <Link to="/signIn">Login</Link>
              </div>
          }

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
              <li>
                <Link to="#">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="donate-btn">
            <Link to="/donation">Support Us</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
