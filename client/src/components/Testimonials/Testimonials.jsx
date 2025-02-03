import React, { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swiper from 'swiper';
import { urlFor, client } from '../../client';

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const query = '*[_type == "testimonials"]';
    client.fetch(query).then((data) => {
      setTestimonials(data);
      new Swiper('.mySwiper', {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        slidesPerView: 1,
        spaceBetween: 30,
        breakpoints: {
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
    });
  }, []);

  return (
    <section className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-6">
        <p className="text-[#6B003E] text-4xl font-bold">Testimonials</p>
        <h2 className="text-2xl text-gray-600">Loved by Individuals Across The Globe</h2>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button className="swiper-button-prev p-3 bg-gray-300 rounded-full">←</button>
        <button className="swiper-button-next p-3 bg-gray-300 rounded-full">→</button>
      </div>

      <div className="swiper mySwiper">
        <div className="swiper-wrapper">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="swiper-slide bg-white p-6 shadow-lg rounded-xl border border-gray-200 hover:shadow-md w-full md:w-[350px] lg:w-[400px] h-auto md:h-[250px] lg:h-[300px] flex flex-col justify-between">
              <div className="flex text-yellow-400 text-xl mb-4">
                <span>&#9733;&#9733;&#9733;&#9733;&#9734;</span>
              </div>
              <p className="text-gray-600 mb-4">{testimonial.feedback}</p>
              <div className="flex items-center gap-4">
                <img src={urlFor(testimonial.imageUrl)} className="w-12 h-12 rounded-full border-2 border-gray-300" alt={testimonial.name} />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.organisation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
