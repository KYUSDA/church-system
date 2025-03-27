import { Calendar } from "lucide-react";

const UpcomingBirthdays = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-pink-400 to-pink-600 shadow-md rounded-lg text-white">
      <div className="flex items-center gap-4">
        <Calendar size={28} />
        <h3 className="text-lg font-semibold">Upcoming Birthdays</h3>
      </div>
      <ul className="mt-4">
        <li className="p-2 bg-white text-black rounded">John Doe - April 5</li>
        {/* Map real birthday data here */}
      </ul>
    </div>
  );
};

export default UpcomingBirthdays;
