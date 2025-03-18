import React from "react";
import EventsCard from "../EventsCard/events_card";

const Banner: React.FC = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-bottom bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/kyu.jpg')" }} // Inline style for debugging
    >
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Hero Text */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <h1 className="text-2xl md:text-4xl font-semibold">WELCOME TO KYUSDA CHURCH</h1>
        <p className="mt-4 text-sm md:text-base">
            Christ was a Seventh-Day Adventist, <br /> to all intents and purposes. <br />
            (Medical Ministry 49.4)
        </p>

      </div>

      {/* Event Cards Section */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-5xl pb-10">
        <EventsCard />
      </div>
    </div>
  );
};

export default Banner;
