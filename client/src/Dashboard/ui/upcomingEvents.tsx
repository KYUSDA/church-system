import React from "react";
import { calendarData } from "../../Dummy/events";
import { useNavigate } from "react-router-dom";

const CalenderSection = () => {
    const navigate = useNavigate();
  // Get the current date
  const currentDate = new Date(Date.now());
  
  // Calculate the start and end of the current week (Sunday to Saturday)
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Move to Sunday
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Move to Saturday

  // Filter events for the current week
  const weeklyEvents = calendarData
    .filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    })
    .map((event) => ({
      title: event.title,
      date: new Date(event.date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      }) + (event.wednesdayVespers.length ? " 6:00 PM" : event.fridayVespers.length ? " 6:00 PM" : " 8:00 AM"),
      type: event.details.department[0] || "Event",
    }));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Weekly Events</h3>
        <button className="text-blue-600" onClick={() => navigate("/member/my-calendar")} >View Upcoming Events</button>
      </div>
      <div className="space-y-4">
        {weeklyEvents.length > 0 ? (
          weeklyEvents.map((event, idx) => (
            <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm text-gray-600">{event.date}</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {event.type}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No events scheduled for this week.</p>
        )}
      </div>
    </div>
  );
};

export default CalenderSection;