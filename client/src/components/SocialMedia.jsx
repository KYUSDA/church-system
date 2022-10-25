import React from 'react';
import { BsLinkedin} from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';
import { BsGithub } from 'react-icons/bs';
import {BsYoutube} from 'react-icons/bs';

const SocialMedia = () => (
  <div className="app__social">
          <div>
            <a href="#youtube" 
            target="_blank" rel="noreferrer">
            <BsYoutube/>
              </a>
    </div>
    <div>
      <a href='#facebook' 
      target='_blank' rel="noreferrer">
      <FaFacebookF />
      </a>
    </div>
  </div>
);

export default SocialMedia;