import React from "react";
import {
  About,
  Footer,
  Header,
  Testimonial,
  Departments,
  Families,
  Announcements,
  Kyusda,
  Leader,
} from "./container/index";
import { Navbar } from "./components";
import Slideshow from "./components/SlideShow/Slideshow";
import "./App.scss";
import Banner from "./components/Header/Banner";
const App = () => (
  <div className="app">
    <Navbar />
    <Banner />
    {/* <Slideshow /> */}
    {/* <Header /> */}
    <About />
    <Leader />
    {/* <Departments />
    <Families /> */}
    <Announcements />
    <Testimonial />
    <Kyusda />
    {/* <Footer /> */}
    {/* New footer */}
  </div>
);

export default App;
