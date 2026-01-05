import React, { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swiper from 'swiper';
import { client,urlFor } from '../utils/client';

const Testimonial: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);

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
    <section className="max-w-7xl mx-auto p-6 mb-8">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-semibold text-gray-900 relative inline-block">
          <span className="text-blue-500 font-medium">Testimonials</span>
          <span className="block w-16 h-1 bg-blue-500 mt-1"></span>
        </h1>
        <p className="text-lg text-gray-600 mt-4">
        Heartfelt Experiences from Our Faithful Community
        </p>
      </header>

      <div className="swiper mySwiper">
        <div className="swiper-wrapper">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="swiper-slide bg-white p-6 shadow-lg rounded-xl border border-gray-200 hover:shadow-md w-full md:w-[350px] lg:w-[400px] h-auto md:h-[250px] lg:h-[300px] flex flex-col justify-between">
              <div className="flex text-yellow-400 text-xl mb-4">
                <span>&#9733;&#9733;&#9733;&#9733;&#9734;</span>
              </div>
              <p className="text-gray-600 mb-4">{testimonial.feedback}</p>
              <div className="flex items-center gap-4">
                <img src={urlFor(testimonial.imageUrl).url()} className="w-12 h-12 rounded-full border-2 border-gray-300" alt={testimonial.name} />
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
