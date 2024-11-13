import React from 'react';
import ibra from '../assets/ibra.jpg';
import hannah from '../assets/hannah.jpg';
import salaton from '../assets/Salaton.jpg';
import pstotula from '../assets/pastorkyusda.jpeg';
import eldersam from '../assets/Eldersam.jpg';
import joshua from '../assets/Joshua pic.jpg';

function Leaders() {
  return (
    <div className="container my-24 px-6 mx-auto">
      <section className="mb-32 text-gray-800 text-center">
        <h2 className="text-5xl font-bold mb-10 text-warning mt-10">
          <span style={{ color: "rgba(107,0,62)" }}>Meet the </span>Church Leaders
        </h2>
        <div className="grid md:grid-cols-3 gap-2"> {/* Reduced gap to 4 for smaller spacing */}
          {/* Leader Card Component */}
          {[{
            src: pstotula, name: "Pst Nicanor Otula", role: "Pastor"
          }, {
            src: eldersam, name: "Elder Samuel Omweri", role: "First Elder"
          }, {
            src: ibra, name: "Elder Ibrahim Kimwecha", role: "Elder"
          }, {
            src: hannah, name: "Hannah Njoki", role: "ALO Leader"
          }, {
            src: joshua, name: "Joshua Hamisi", role: "Elder"
          }, {
            src: salaton, name: "Christopher Salaton", role: "Elder"
          }].map(({ src, name, role }, index) => (
            <div key={index} className="mb-6 lg:mb-0 flex justify-center"> {/* Center each card */}
              <div className="bg-white block rounded-lg shadow-lg w-[250px] h-[250px] overflow-hidden">
                <div className="relative w-full h-[70%]">
                  <img src={src} className="w-full h-full object-cover object-center" alt={name} /> {/* Center image to avoid cutting faces */}
                  <svg className="absolute bottom-0 left-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#fff" d="M0,96L48,128C96,160,192,224,288,240C384,256,480,224,576,213.3C672,203,768,213,864,202.7C960,192,1056,160,1152,128C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                  </svg>
                </div>
                <div className="p-3 h-[30%] flex flex-col items-center justify-center">
                  <h5 className="text-lg font-bold">{name}</h5>
                  <p className="text-gray-500">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Leaders;
