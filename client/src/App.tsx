import React from "react";
import Navbar from "./LandingPage/Navbar/Navbar";
import About from "./LandingPage/About";
import Leaders from "./LandingPage/Leaders";
import MainFooter from "./LandingPage/Footer/MainFooter";
import Banner from "./LandingPage/Banner";
import Testimonial from "./LandingPage/Testimonials";
import Posts from "./LandingPage/Posts";
import DonationsCTA from "./LandingPage/DonationCta";
import SEO from "./components/SEO";


const App: React.FC = () => (
  <div className="app">
    <SEO title="Welcome to KYUSDA" description="Discover our mission, connect with our community, and explore our latest news and events." />
    <Navbar />
    <Banner />
    <About />
    <Leaders />
    <Posts />
    <Testimonial />
    <DonationsCTA />
    <MainFooter />
  </div>
);

export default App;
