import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useGetUpcomingEventsQuery } from "@/services/eventsService";

const EventsCard: React.FC = () => {
  const { data } = useGetUpcomingEventsQuery();

  const events = data?.data || [];

  return (
    <div className="relative flex flex-col justify-center items-center py-8 w-full">
      {events.length === 0 ? (
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <p className="text-gray-500">No upcoming events available.</p>
        </div>
      ) : (
        <>
          {/* Mobile view */}
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
                  <div className="bg-white shadow-lg rounded-lg p-6 w-full relative min-h-[200px]">
                    <div className="absolute -top-3 left-4 bg-[rgba(18,172,141,0.9)] text-white px-4 py-2 rounded-md text-sm font-bold shadow-md">
                      <span>
                        {new Date(event.start_date).toLocaleDateString()} -{" "}
                        {new Date(event.end_date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-bold text-md mt-8 sm:text-lg">
                      {event.title}
                    </h3>
                    {event.links ? (
                      <Link
                        to={event.links[0]}
                        className="text-[#12ac8e] mt-2 cursor-pointer font-semibold hover:text-[#0e8f71] transition-colors"
                      >
                        {event.description}
                      </Link>
                    ) : (
                      <p className="text-[#12ac8e] mt-2 cursor-pointer font-semibold">
                        {event.description}
                      </p>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop view */}
          <div className="hidden md:flex space-x-6">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 w-70 relative"
              >
                <div className="absolute -top-5 left-4 bg-[rgba(18,172,141,0.9)] text-white px-3 py-1 rounded-md text-sm font-bold">
                  <span>
                    {new Date(event.start_date).toLocaleDateString()} -{" "}
                    {new Date(event.end_date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-bold text-lg mt-6">{event.title}</h3>
                {event.links ? (
                  <Link
                    to={event.links[0]}
                    className="text-[#12ac8e] mt-2 cursor-pointer font-semibold hover:text-[#0e8f71] transition-colors"
                  >
                    {event.description}
                  </Link>
                ) : (
                  <p className="text-[#12ac8e] mt-2 cursor-pointer font-semibold">
                    {event.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Social links */}
      <div className="absolute bottom-0 flex space-x-4 mt-4">
        <a
          href="https://x.com/kyusdachurch?s=09"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#12ac8e] p-3 rounded-full text-white text-xl hover:bg-[#0e8f71] transition"
        >
          <FaXTwitter />
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
          <FaFacebookF />
        </a>
      </div>
    </div>
  );
};

export default EventsCard;
