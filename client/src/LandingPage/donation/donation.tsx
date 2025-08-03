import React, { useState } from "react";

const DonationPage: React.FC = () => {
 
  const events = [
    // { 
    //   title: "Fundraiser for Our Mission",
    //   badge: "Mission",
    //   date: "April 27, 2025",
    //   description: "Join us in supporting our church mission. Every contribution counts!"
    //  },
     {
      title: "Camp Meeting",
      badge: "Camp meeting",
      date: "Sept 7th-13th, 2025",
      description: "Our this year's camp meeting is one you want to attend. You can't afford to miss this!"
     }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      {/* Left Section: Events */}
      <div className="w-full md:w-1/2">
       <h2 className="text-center text-2xl md:text-4xl font-bold my-8 md:mt-12 md:mb-16">
        Support <span className="text-teal-500">Our</span> Programs
      </h2>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4 border border-teal-300">
              <h3 className="flex justify-between items-center text-lg font-semibold text-teal-700">{event.title} 
                <span className="py-1 px-2 text-sm bg-teal-400 rounded-full text-white">#{event.badge}</span></h3>
              <p className="text-gray-600 text-sm">{event.date}</p>
              <p className="text-gray-700 mt-2">{event.description}</p>

              <div className="mt-6 p-4 bg-gray-50 border-t-2 border-teal-500 rounded-md">
                <h3 className="text-lg font-bold text-teal-700">Equity Bank Payment Details</h3>
                <p className="text-gray-700 mt-2">Paybill: <span className="font-semibold">247247</span></p>
                <p className="text-gray-700">Account Number: <span className="font-semibold">768769#SUPPORT</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationPage;