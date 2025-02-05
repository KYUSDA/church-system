import React from "react";
import {
  About,
  Testimonial,
  Announcements,
  Leader
} from "./container/index";
import { Navbar } from "./components";
import MainFooter from "./components/Footer/MainFooter";
//import Slideshow from "./components/SlideShow/Slideshow";
import "./App.scss";
import Banner from "./components/Header/Banner";
const App = () => (
  <div className="app">
    <Navbar />
    <Banner />
    <About />
    <Leader />
    <Announcements />
    <Testimonial />
    <MainFooter />
  </div>
);

export default App;
