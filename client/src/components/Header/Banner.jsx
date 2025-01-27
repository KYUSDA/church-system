import React from 'react'
import './Banner.css';
import EventsCard from '../EventsCard/events_card';

const Banner = () => {
    return (
        <div className='hero-section'>
        <EventsCard />
            {/* Hero Text */}
            <div className="hero-text">
                <h1>WELCOME TO KYUSDA CHURCH</h1>
                <p>
                    Christ was a Seventh-Day Adventist,
                    <br /> to all intents and purposes. <br />
                    (Medical Ministry 49.4)
                </p>
            </div>
        </div>
    )
}

export default Banner;
