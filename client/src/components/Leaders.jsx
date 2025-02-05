import React from 'react';
import ibra from '../assets/ibra.jpg';
import hannah from '../assets/hannah.jpg';
import salaton from '../assets/Salaton.jpg';
import pstotula from '../assets/pastorkyusda.jpeg';
import eldersam from '../assets/Eldersam.jpg';
import joshua from '../assets/Joshua pic.jpg';

const leaders = [
  { src: pstotula, name: "Nicanor Otula", role: "Pastor" },
  { src: eldersam, name: "Samuel Omweri", role: "First Elder" },
  { src: ibra, name: "Ibrahim Kimwecha", role: "Elder" },
  { src: hannah, name: "Hannah Njoki", role: "ALO Leader" },
  { src: joshua, name: "Joshua Hamisi", role: "Elder" },
  { src: salaton, name: "Chris Salaton", role: "Elder" }
];

function Leaders() {
  return (
    <div className="container mx-auto my-12 px-6 text-center">
      {/* <h2 className="text-4xl font-bold mb-8 pt-6 text-gray-800">
        <span className="text-[#6B003E]">Meet the </span>Church Leaders
      </h2> */}
      <header className="text-center my-8">
        <h1 className="text-3xl font-semibold text-gray-900 relative inline-block">
          Church <span className="text-blue-500 font-medium">LEADERS</span>
          <span className="block w-16 h-1 bg-blue-500 mt-1"></span>
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Meet our church leaders 
        </p>
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-center overflow-hidden">
        {leaders.map(({ src, name, role }, index) => (
          <div key={index} className="p-4  w-64 mx-auto">
            <img src={src} alt={name} className="w-32 h-32 mx-auto rounded-full object-cover" />
            <h5 className="text-lg font-semibold mt-4">{name}</h5>
            <p className="text-gray-500">{role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaders;



