import React from 'react';
import ibra from '../assets/ibra.jpg'; // Import image of Elder Ibrahim Kimwecha
import hannah from '../assets/hannah.jpg'; // Import image of Hannah Njoki
import salaton from '../assets/Salaton.jpg'; // Import image of Elder Christopher Salaton
import pstotula from '../assets/pastorkyusda.jpeg'; // Import image of Pastor Nicanor Otula
import eldersam from '../assets/Eldersam.jpg'; // Import image of Elder Samuel Omweri
import joshua from '../assets/Joshua pic.jpg'; // Import image of Elder Joshua Hamisi

/**
 * Leaders component renders a section displaying church leaders in a 2x3 grid layout.
 * Each leader has an image, name, and role, styled with Tailwind CSS.
 */
function Leaders() {
  return (
    <div className="container my-24 px-6 mx-auto"> {/* Main container with margins and padding for spacing */}
      <section className="mb-10 text-gray-800 text-center"> {/* Centered section for the content */}
        {/* Section Heading */}
        <h2 className="text-5xl font-bold mb-10 text-warning mt-10">
          <span style={{ color: "rgba(107,0,62)" }}>Meet the </span>Church Leaders
        </h2>

        {/* Grid layout: 2 rows and 3 columns with equal gaps */}
        <div className="grid grid-cols-3 gap-10"> {/* Uniform gap for both rows and columns */}
          {[
            { src: pstotula, name: "Pst Nicanor Otula", role: "Pastor" },
            { src: eldersam, name: "Elder Samuel Omweri", role: "First Elder" },
            { src: ibra, name: "Elder Ibrahim Kimwecha", role: "Elder" },
            { src: hannah, name: "Hannah Njoki", role: "ALO Leader" },
            { src: joshua, name: "Joshua Hamisi", role: "Elder" },
            { src: salaton, name: "Christopher Salaton", role: "Elder" }
          ].map(({ src, name, role }, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden w-[400px] h-[300px] mx-auto"
            >
              {/* Card container with fixed width, height, and shadow */}
              <div className="relative w-full h-[80%] overflow-hidden">
                {/* Top section of the card with the leader's image */}
                <img
                  src={src}
                  className="w-full h-full object-cover object-top"
                  alt={name} // Image alt text is the leader's name
                />
                {/* Decorative SVG wave at the bottom of the image */}
                <svg
                  className="absolute bottom-0 left-0 w-full"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1440 320"
                >
                  <path
                    fill="#fff"
                    d="M0,96L48,128C96,160,192,224,288,240C384,256,480,224,576,213.3C672,203,768,213,864,202.7C960,192,1056,160,1152,128C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                  ></path>
                </svg>
              </div>
              {/* Bottom section of the card with the leader's name and role */}
              <div className="p-3 h-[20%] flex flex-col items-center justify-center">
                <h5 className="text-lg font-bold">{name}</h5> {/* Leader's name */}
                <p className="text-gray-500">{role}</p> {/* Leader's role */}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Leaders;
