import React from 'react';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/footer';
import {useState,useEffect} from 'react';

const Home = ()=>{
    return (
<div className='home'>
<Navbar />
<div className='banner'>
    </div>
    <div className='footer'>
    <Footer />
    </div>
</div>
    )
}

export default Home
