
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { urlFor, client } from '../../client';
import { getAllFamilies } from '../../redux/apicall';
import { useDispatch } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import FamilySkeleton from './FamilySkeleton';

export const Families = () => {
  const [Families, setFamilies] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  function findUniqueById(dataArray) {
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

  return (
    <div>
      <h2 className="text-center text-2xl md:text-4xl font-bold my-8 md:mt-12 md:mb-16">
        Our <span className="text-blue-500">Families</span> Section
      </h2>

      <div className="mx-auto px-12 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <FamilySkeleton key={index} />
              ))
            : Families.map((family, index) => (
                <div
                  key={index}
                  className="relative flex flex-col bg-white shadow-md rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg h-[350px]"
                >
                  {/* Image Section */}
                  <div className="bg-white shadow-lg shadow-gray-300 overflow-hidden" style={{ height: '42%' }}>
                    <LazyLoadImage
                      src={urlFor(family.imgUrl)}
                      alt={family.title}
                      effect="blur"
                      className="w-full object-cover"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="relative z-10 flex flex-col flex-grow p-4 bg-white">
                    <h4 className="text-lg font-semibold mb-2 text-center">{family.title}</h4>
                    <p className="text-sm text-gray-600 overflow-hidden line-clamp-3">{family.description}</p>

                    {/* Tags */}
                    {family.tags.length > 0 && (
                      <span className="mt-4 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded self-start">
                        {family.tags[0]}
                      </span>
                    )}

                    {/* See More Button */}
                    <Link
                      to={`/families/${family._id}`}
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 group flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-all duration-500"
                    >
                      Read More
                      <svg
                        className="transition-all duration-500 group-hover:translate-x-1"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.25 9L14.25 9M10.5 13.5L14.4697 9.53033C14.7197 9.28033 14.8447 9.15533 14.8447 9C14.8447 8.84467 14.7197 8.71967 14.4697 8.46967L10.5 4.5"
                          stroke="#4F46E5"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Families;
