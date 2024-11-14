// import React from 'react'
// import { Link } from 'react-router-dom';
// import './Banner.css';
// const Banner = () => {
//     return (
//         <div className='hero-section'>
//             <div className="hero-text">
//                 <h1>WELCOME TO KYUSDA CHURCH</h1>
//                 <p>
//                     Christ was a Seventh-Day Adventist,
//                     <br /> to all intents and purposes. <br />
//                     (Medical Ministry 49.4)
//                 </p>
//                 <Link to="/about-section">
//                     About Us <i className="fa fa-angle-down"></i>
//                 </Link>
//             </div>
//         </div>
//     )
// }

// export default Banner



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
                    About Us <i className="fa fa-angle-down"></i>
                </Link>
            </div>

            {/* YouTube Preview Thumbnail */}
            <a 
                href="https://www.youtube.com/watch?v=844gAZ62cXs" 
                target="_blank" 
                rel="noreferrer" 
                className="youtube-thumbnail-link"
            >
                <img 
                    src="https://img.youtube.com/vi/844gAZ62cXs/hqdefault.jpg" 
                    alt="Upcoming Event" 
                    className="youtube-thumbnail" 
                />
            </a>
        </div>
    )
}

export default Banner;
