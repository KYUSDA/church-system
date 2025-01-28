import React from 'react'
import { FaTwitter,FaFacebook,FaYoutube } from 'react-icons/fa'
import './Footer.css'
function Footer() {
  return (
     <div className="footer__bar">
            <div className="footer__bar__content">
              <p>Copyright © 2024 Kirinyaga University Church. All rights reserved.</p>
              <div className="footer__socials">
                <a href='https://www.facebook.com/KyUSDAchurch' target='_blank' rel="noreferrer"><FaFacebook /></a>
                <a href="https://x.com/kyusdachurch?s=09" target='_blank' rel="noreferrer"><FaTwitter /></a>
                <a href="http://www.youtube.com/@kyusdachurch" target='_blank' rel="noreferrer"><FaYoutube /></a>
              </div>
            </div>
          </div>
  )
}

export default Footer