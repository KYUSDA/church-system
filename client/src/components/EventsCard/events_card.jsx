
import React from "react";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const events = [
  {
    date: "Feb 12",
    time: "7.00 am",
    title: "Online Money Challenge Collections for Mission",
    details: "Event Details",
  },
  {
    date: "Jan 3",
    time: "8.00 am",
    title: "Our Sponsorship Meetup Will Be Held Again",
    details: "Event Details",
  },
];

const EventsCard = () => {
  return (
    <div className="relative flex flex-col justify-center items-center py-8 w-full">
      <div className="w-full max-w-md md:hidden mt-4">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Pagination, Autoplay]}
          className="w-full"
        >
          {events.map((event, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white shadow-lg rounded-lg p-4 w-full relative">
                <div className="absolute top-1 left-4 bg-[rgba(18,172,141,0.9)] text-white px-4 py-1 rounded-md text-sm font-bold">
                  <span>{event.date}</span>
                  <div className="text-xs font-normal ">{event.time}</div>
                </div>
                <h3 className="font-bold text-md mt-8 sm:text-lg">{event.title}</h3>
                <p className="text-[#12ac8e] mt-2 cursor-pointer font-semibold">{event.details}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="hidden md:flex space-x-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 w-70 relative"
          >
            <div className="absolute -top-5 left-4 bg-[rgba(18,172,141,0.9)] text-white px-3 py-1 rounded-md text-sm font-bold">
              <span>{event.date}</span>
              <div className="text-xs font-normal">{event.time}</div>
            </div>
            <h3 className="font-bold text-lg mt-6">{event.title}</h3>
            <p className="text-[#12ac8e] mt-2 cursor-pointer font-semibold">{event.details}</p>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 flex space-x-4 mt-4">
        <a
          href="https://x.com/kyusdachurch?s=09"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#12ac8e] p-3 rounded-full text-white text-xl hover:bg-[#0e8f71] transition"
        >
          <FaTwitter />
        </a>
        <a
          href="http://www.youtube.com/@kyusdachurch"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 p-3 rounded-full text-white text-xl hover:bg-red-700 transition"
        >
          <FaYoutube />
        </a>
        <a
          href="https://www.facebook.com/KyUSDAchurch"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 p-3 rounded-full text-white text-xl hover:bg-blue-700 transition"
        >
          <FaFacebook />
        </a>
      </div>
    </div>
  );
};

export default EventsCard;
