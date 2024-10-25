import React from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { BsYoutube } from 'react-icons/bs';

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href="https://www.youtube.com/@kyusdachurch9822"
        target="_blank" rel="noreferrer">
        <BsYoutube />
      </a>
    </div>
    <div>
      <a href='https://www.facebook.com/profile.php?id=100083015178066'
        target='_blank' rel="noreferrer">
        <FaFacebookF />
      </a>
    </div>
  </div>
);

export default SocialMedia;