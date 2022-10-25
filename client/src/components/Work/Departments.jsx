import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Departments.scss';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    const query = '*[_type == "departments"]';
    client.fetch(query).then((data) => {
      setDepartments(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">Our <span>Departments</span> Section</h2>
      <motion.div

        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >

        {departments.map((department, index) => (
          <div className="app__work-item app__flex"
           key={index}>
            <div
              className="app__work-img app__flex"
            >
              <img src={urlFor(department.imgUrl)}
               alt={department.title} />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.25, ease: 'easeInOut', 
                staggerChildren: 0.5 }}
                className="app__work-hover app__flex"
              >
                <a href="#department"
                target="_blank" rel="noreferrer">

                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.90] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">
                {department.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>
                {department.description}</p>

              <div className="app__work-tag app__flex">
                <p className="p-text">{department.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Departments, 'app__works'),
  'departments',
  'app__primarybg',
);