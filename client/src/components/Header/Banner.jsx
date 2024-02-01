import React from 'react'
import { Link } from 'react-router-dom';
import './Banner.css';
const Banner = () => {
    return (
        <div className='hero-section'>
            <div className="hero-text">
                <h1>WELCOME TO KYUSDA CHURCH</h1>
                <p>
                    Christ was a Seventh-Day Adventist,
                    <br /> to all intents and purposes. <br />
                    (Medical Ministry 49.4)
                </p>
                <Link to="/about-section">
                    About Us <i class="fa fa-angle-down"></i>
                </Link>
            </div>
        </div>
    )
}

export default Banner