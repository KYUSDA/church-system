// 

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebookSquare, FaYoutube, FaTwitter } from "react-icons/fa";

function EventsCard() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const heroSection = document.querySelector(".hero-section");
    const heroSectionHeight = heroSection?.offsetHeight || 0;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition < heroSectionHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []); 

  // State for countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

     // Countdown target date (replace with your event date)
      const eventName = "Health Sabbath";
    
      useEffect(() => {
        const eventDate = new Date("2025-02-01T00:00:00");
        const timer = setInterval(() => {
          const now = new Date();
          const difference = eventDate - now;
    
          if (difference <= 0) {
            clearInterval(timer); // Stop timer if the event date has passed
          } else {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
            setTimeLeft({ days, hours, minutes, seconds });
          }
        }, 1000);
    
        return () => clearInterval(timer);
      }, []);

  return (
    <div
      className={`fixed bottom-0 left-4 bg-white shadow-lg rounded-2xl p-4 w-72 transform transition-transform z-50 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex flex-col items-center">
        {/* Social Links */}
        <div className="flex space-x-4 mb-4">
          <a
            href="https://www.facebook.com/KYUSDANewYork/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:scale-110 transition-transform"
          >
            <FaFacebookSquare size={28} />
          </a>
          <a
            href="https://twitter/kyusda/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:scale-110 transition-transform"
          >
            <FaTwitter size={28} />
          </a>
          <a
            href="https://www.youtube.com/@kyusdachurch"
            target="_blank"
            rel="noreferrer"
            className="text-red-600 hover:scale-110 transition-transform"
          >
            <FaYoutube size={28} />
          </a>
        </div>

        {/* Event Details */}
        <div className="text-center mb-4">
          <h6 className="text-sm font-bold text-green-700">Upcoming Event:</h6>
          <h2 className="text-xl font-bold text-green-700">{eventName}</h2>
        </div>

        {/* Countdown Timer */}
        <div className="flex justify-around w-full text-center text-sm font-medium text-gray-700 mb-4">
          <div>
            <span className="block text-2xl font-bold text-green-600">{timeLeft.days}</span>
            <span>Days</span>
          </div>
          <div>
            <span className="block text-2xl font-bold text-green-600">{timeLeft.hours}</span>
            <span>Hrs</span>
          </div>
          <div>
            <span className="block text-2xl font-bold text-green-600">{timeLeft.minutes}</span>
            <span>Mins</span>
          </div>
          <div>
            <span className="block text-2xl font-bold text-green-600">{timeLeft.seconds}</span>
            <span>Secs</span>
          </div>
        </div>

        {/* Link to Details */}
        <Link
          to="#events"
          className="text-green-700 text-sm font-semibold underline hover:text-green-900"
        >
          Event Details
        </Link>
      </div>
    </div>
  );
}

export default EventsCard;
