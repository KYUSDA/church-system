import React from 'react'
import { Link } from 'react-router-dom'
import '../../components/css/Footer.css';
import { FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa'

const MainFooter: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer_section__container footer__container">
        <div className="footer__col">
          <h3>Kirinyaga University<span> Church</span></h3>
          <p>
            We are blessed to be a part of your spiritual journey and are dedicated 
            to fostering faith, hope, and community at every step.
          </p>
          <p>
            Join us in worship, fellowship, and service as we grow together in faith and 
            love, following the teachings of Christ.
          </p>
        </div>
        
        <div className="footer__col">
          <h4>About Us</h4>
          <p><a href="#home">Home</a></p>
          <p><a href="#about">About Us</a></p>
          <p><a href="#ministries">Our Ministries</a></p>
          <p><a href="#events">Upcoming Events</a></p>
          <p><Link to={"/kirinyaga-adventist-terms-and-conditions"} target='_blank'>Terms & Conditions</Link></p>
        </div>
        
        <div className="footer__col">
          <h4>Resources</h4>
          <p><a href="#sermons">Sermons</a></p>
          <p><a href="#bible-study">Bible Study</a></p>
          <p><Link to={"/kirinyaga-adventist-privacy-policy"} target='_blank'>Privacy Policy</Link></p>
          <p><a href="#volunteer">Volunteer Opportunities</a></p>
          <p><a href="#donations">Make a Donation</a></p>
        </div>
        
        <div className="footer__col">
          <h4>Contact Us</h4>
          <p>
            <i className="ri-map-pin-2-fill"></i> Kirinyaga University, Kutus, Kirinyaga
          </p>
          <p><i className="ri-mail-fill"></i> kyusdachurch@gmail.com</p>
          <p><i className="ri-phone-fill"></i>  (+254) 797 138885</p>
        </div>
      </div>
      
      <div className="footer__bar">
        <div className="footer__bar__content">
        <p>Copyright © {new Date().getFullYear()} Kirinyaga University Church. All rights reserved.</p>
          <div className="footer__socials">
            <a href='https://www.facebook.com/KyUSDAchurch' target='_blank' rel="noreferrer"><FaFacebook /></a>
            <a href="https://x.com/kyusdachurch?s=09" target='_blank' rel="noreferrer"><FaTwitter /></a>
            <a href="http://www.youtube.com/@kyusdachurch" target='_blank' rel="noreferrer"><FaYoutube /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default MainFooter
