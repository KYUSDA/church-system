import React from "react";
import Navbar from "./LandingPage/Navbar/Navbar";
import About from "./LandingPage/About";
import Leaders from "./LandingPage/Leaders";
import Announcement from "./LandingPage/Announcements/Announcement";
import MainFooter from "./LandingPage/Footer/MainFooter";
import Banner from "./LandingPage/Banner";
import Testimonial from "./LandingPage/Testimonials";


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
