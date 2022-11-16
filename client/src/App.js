import React from 'react';
import { 
  About, 
  Footer, 
  Header, 
  Testimonial,
  Departments,
  Families,
Announcements,
Kyusda
} 
from './container/index';
import { Navbar } from './components';
import './App.scss';
const App = () => (
  <div className="app">
    <Navbar />
    <Header />
    <About />
    <Departments />
<Families />
<Announcements />
<Testimonial />
<Kyusda />
<Footer />
  </div>
);

export default App;