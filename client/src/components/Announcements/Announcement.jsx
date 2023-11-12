import React, { useState, useEffect } from 'react';
import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Announcements.scss';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  useEffect(() => {
    const query = '*[_type == "announcements"]';
    client.fetch(query).then((data) => {
      setAnnouncements(data);
    });

  }, []);

  return (
    <>
      {announcements.map((announce => (
        <div className="app__testimonial-item app__flex" style={{ marginTop: "600px" }}>
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
    </>
  );
};

export default AppWrap(
  MotionWrap(Announcements, 'app__testimonial'),
  'announcements',
  'app__primarybg',
);