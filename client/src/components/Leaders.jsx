import React from 'react';
import ibra from '../assets/ibra.jpg';
import hannah from '../assets/hannah.jpg';
import salaton from '../assets/Salaton.jpg';
import pstotula from '../assets/pastorkyusda.jpeg';
import eldersam from '../assets/Eldersam.jpg';
import joshua from '../assets/Joshua pic.jpg';

const leaders = [
  { src: pstotula, name: "Pst Nicanor Otula", role: "Pastor" },
  { src: eldersam, name: "Elder Samuel Omweri", role: "First Elder" },
  { src: ibra, name: "Elder Ibrahim Kimwecha", role: "Elder" },
  { src: hannah, name: "Hannah Njoki", role: "ALO Leader" },
  { src: joshua, name: "Joshua Hamisi", role: "Elder" },
  { src: salaton, name: "Christopher Salaton", role: "Elder" }
];

function Leaders() {
  return (
    <div className="container mx-auto my-12 px-6">
      <section className="text-center">
        <h2 className="text-4xl font-bold mb-8 pt-6 text-gray-800">
          <span className="text-[#6B003E]">Meet the </span>Church Leaders
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
          {leaders.map(({ src, name, role }, index) => (
            <div key={index} className="p-4 text-center w-64 mx-auto">
              <img src={src} alt={name} className="w-32 h-32 mx-auto rounded-full object-cover" />
              <h5 className="text-lg font-semibold mt-4">{name}</h5>
              <p className="text-gray-500">{role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Leaders;

