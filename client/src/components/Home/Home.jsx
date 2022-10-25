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
{/* <div className='content'> */}
{/* <h3>Welcome to MayFair Insurance</h3>
<p>Best and trusted Insurance company in kenya</p>
<p>
Kindly Regster yourself to get the automated form,
 to claim
your vehicle insurance
</p> */}
{/* </div> */}
    </div>
    <div className='footer'>
    <Footer />
    </div>
</div>
    )
}

export default Home
