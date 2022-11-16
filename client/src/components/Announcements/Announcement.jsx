import React, { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Announcements.scss';

const Announcements = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [announcements, setAnnouncements] = useState([]);

//   const handleClick = (index) => {
//     setCurrentIndex(index);
//   };

  useEffect(() => {
    const query = '*[_type == "announcements"]';

    client.fetch(query).then((data) => {
      setAnnouncements(data);
    });

  }, []);

  return (
    <>
     <h2 className="head-text">Announcements</h2>
{announcements.map((announce=>(
    <div className="app__testimonial-item app__flex">
    <img src={urlFor(announce.imageUrl)} alt={announce.name} />
    <div className="app__testimonial-content">
              <p className="p-text">{announce.announce}</p>
              <h5>{announce.department} department</h5>
              <div>
      <h4 className="bold-text">{announce.name}</h4>
      <h5 className="p-text">By: {announce.organisation}</h5>
      <h5>{announce.date}</h5>
              </div>
            </div>
    </div>
)))}




      {announcements.length && (
        <>
          {/* <div className="app__testimonial-item app__flex">
  <img src={urlFor(announcements.imageUrl)} 
  alt={announcements.name} />
            <div className="app__testimonial-content">
              <p className="p-text">{announcements.announce}</p>
              <div>
      <h4 className="bold-text">{announcements.name}</h4>
      <h5 className="p-text">{announcements.organisation}</h5>
              </div>
            </div>
          </div> */}

          {/* <div className="app__testimonial-btns app__flex">
            <div className="app__flex" onClick={() => 
            handleClick(currentIndex === 0 ? announcements.length - 1 : currentIndex - 1)}>
              <HiChevronLeft />
            </div>

            <div className="app__flex" onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
              <HiChevronRight />
            </div>
          </div> */}
        </>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Announcements, 'app__testimonial'),
  'announcements',
  'app__primarybg',
);