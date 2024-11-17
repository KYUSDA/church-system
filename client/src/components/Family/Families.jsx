import React, { useState, useEffect } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { urlFor, client } from '../../client';
import './Families.scss';
import { getAllFamilies } from '../../redux/apicall';
import { useDispatch } from 'react-redux';

// Importing the LazyLoadImage component for lazy loading images
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import FamilySkeleton from './FamilySkeleton';

export const Families = () => {
  const [Families, setFamilies] = useState([]);
  const [animateCard] = useState({ y: 0, opacity: 1 });
  const dispatch = useDispatch();

  // usestate to check loading
  const [loading, setLoading] = useState(true);

  function findUniqueById(dataArray) {
    // Use filter to get only items with unique ids
    const uniqueItems = dataArray.filter((item, index, array) => {
      return array.findIndex((otherItem) => otherItem.title === item.title) === index;
    });
    return uniqueItems;
  }

  useEffect(() => {
    const query = '*[_type == "families"]';
    client.fetch(query).then((data) => {
      const familyData = findUniqueById(data);
      setFamilies(familyData);
      getAllFamilies(dispatch, data);
      setLoading(false); // Stop loading after fetching data
    });
  }, [dispatch]);

//   return (
//     <div>
//       <h2 className="head-text">Our <span>
//         Families</span> Section</h2>
//       <motion.div
//         animate={animateCard}
//         transition={{ duration: 0.5, delayChildren: 0.5 }}
//         className="app__work-portfolio"
//         style={{ marginBottom: "120px" }}
//       >
//         {Families.map((family, index) => (
//           <div className="app__work-item app__flex"
//             key={index} >
//             <div
//               className="app__work-img app__flex"

//             >
//               <LazyLoadImage src={urlFor(family.imgUrl)}
//                 alt={family.title}
//                 effect={'blur'}
//                 loading='lazy'
//                 placeholderSrc={'/cover.jpeg'}
//                 />
//               <motion.div
//                 whileHover={{ opacity: [0, 1] }}
//                 transition={{
//                   duration: 0.25, ease: 'easeInOut',
//                   staggerChildren: 0.5
//                 }}
//                 className="app__work-hover app__flex"

//               >
//                 <Link to={`/families/${family._id}`}
//                   rel="noreferrer">
//                   <motion.div
//                     whileInView={{ scale: [0, 1] }}
//                     whileHover={{ scale: [1, 0.90] }}
//                     transition={{ duration: 0.25 }}
//                     className="app__flex"
//                   >
//                     <AiFillEye />
//                   </motion.div>
//                 </Link>
//               </motion.div>
//             </div>

//             <div className="app__work-content app__flex">
//               <h4 className="bold-text" >
//                 {family.title}</h4>
//               <p className="p-text"
//                 style={{ marginTop: 10 }}>
//                 {family.description}</p>
//               <div className="app__work-tag app__flex">
//                 <p className="p-text">
//                   {family.tags[0]}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// export default Families

return (
  <div>
    <h2 className="head-text">
      Our <span>Families</span> Section
    </h2>
    <motion.div
      animate={animateCard}
      transition={{ duration: 0.5, delayChildren: 0.5 }}
      className="app__work-portfolio"
      style={{ marginBottom: "120px" }}
    >
      {loading  ? Array.from({ length: 6 }).map((_, index) => (
              <FamilySkeleton key={index} />
            ))
          : (
        // Actual data
        Families.map((family, index) => (
          <div className="app__work-item app__flex" key={index}>
            <div className="app__work-img app__flex">
              <LazyLoadImage
                src={urlFor(family.imgUrl)}
                alt={family.title}
                effect="blur"
                loading="lazy"
                placeholderSrc="/cover.jpeg"
              />
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex"
              >
                <Link to={`/families/${family._id}`} rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
            <div className="app__work-content app__flex">
              <h4 className="bold-text">{family.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>
                {family.description}
              </p>
              <div className="app__work-tag app__flex">
                <p className="p-text">{family.tags[0]}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </motion.div>
  </div>
);
}

export default Families;