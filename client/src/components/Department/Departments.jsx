
import React, { useState, useEffect } from 'react';
import { urlFor, client } from '../../client';
import { getAllDepartments } from '../../redux/apicall';
import { useDispatch } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import 'react-lazy-load-image-component/src/effects/blur.css';


const Departments = () => {
  const dispatch = useDispatch();
  const [departments, setDepartments] = useState([]);

  // Function to find unique departments by title
  function findUniqueById(dataArray) {
    return dataArray.filter((item, index, array) =>
      array.findIndex((otherItem) => otherItem.title === item.title) === index
    );
  }

  // Fetch departments data on mount
  useEffect(() => {
    const query = '*[_type == "departments"]';
    client.fetch(query).then((data) => {
      const familyData = findUniqueById(data);
      setDepartments(familyData);
      getAllDepartments(dispatch, familyData);
    });
  }, [dispatch]);

  return (
    <>
      {/* Header Section */}
      <h2 className="text-center text-2xl md:text-4xl font-bold my-8 md:mt-12 md:mb-16">
        Our <span className="text-blue-500">Departments</span> Section
      </h2>

      <div className="mx-auto px-12 mb-12">
        {/* Grid layout for the cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((department, index) => (
            <div
              key={index}
              className="relative flex flex-col bg-white shadow-md rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg h-[350px]"
            >
              {/* Image Section */}
              <div
                class=" bg-white shadow-lg shadow-gray-300 overflow-hidden"
                style={{ height: '42%' }}
              >
                <LazyLoadImage
                  src={urlFor(department.imgUrl)}
                  alt={department.title}
                  effect="blur"
                  className='w-full object-cover'
                />
              </div>

              {/* Content Section */}
              <div className="relative z-10 flex flex-col flex-grow p-4 bg-white">
                <h4 className="text-lg font-semibold mb-2 text-center">
                  {department.title}
                </h4>

                {/* Description */}
                <p className="text-sm text-gray-600 overflow-hidden line-clamp-3">
                  {department.description}
                </p>

                {/* Tags */}
                {department.tags.length > 0 && (
                  <span className="mt-4 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded self-start">
                    {department.tags[0]}
                  </span>
                )}

                {/* See More Button */}
                <Link to={`/Departments/${department._id}`} class="absolute bottom-4 left-1/2 transform -translate-x-1/2 group flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-all duration-500 ">Read More <svg class="transition-all duration-500  group-hover:translate-x-1" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.25 9L14.25 9M10.5 13.5L14.4697 9.53033C14.7197 9.28033 14.8447 9.15533 14.8447 9C14.8447 8.84467 14.7197 8.71967 14.4697 8.46967L10.5 4.5" stroke="#4F46E5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default Departments;
