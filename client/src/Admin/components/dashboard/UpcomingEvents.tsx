import { Calendar } from "lucide-react";

const UpcomingEvents = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-indigo-400 to-indigo-600 shadow-md rounded-lg text-white">
      <div className="flex items-center gap-4">
        <Calendar size={28} />
        <h3 className="text-lg font-semibold">Upcoming Events</h3>
      </div>
      <ul className="mt-4">
        <li className="p-2 bg-white text-black rounded">Sunday Worship - April 7</li>
        {/* Map actual event data */}
      </ul>
    </div>
  );
};

export default UpcomingEvents;
