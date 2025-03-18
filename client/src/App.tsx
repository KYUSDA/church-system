import React from "react";
import Navbar from "./LandingPage/Navbar/Navbar";
import About from "./LandingPage/About/About";
import Leaders from "./LandingPage/leaders/Leaders";
import Announcement from "./LandingPage/Announcements/Announcement";
import MainFooter from "./LandingPage/Footer/MainFooter";
import "../App.scss";
import Banner from "./LandingPage/Header/Banner";
import Testimonial from "./LandingPage/Testimonials/Testimonials";


const App: React.FC = () => (
  <div className="app">
    <Navbar />
    <Banner />
    <About />
    <Leaders />
    <Announcement />
    <Testimonial />
    <MainFooter />
  </div>
);

export default App;
