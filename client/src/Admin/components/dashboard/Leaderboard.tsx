import { Trophy } from "lucide-react";

const Leaderboard = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg ">
      <div className="flex items-center gap-4">
        <Trophy size={28} />
        <h3 className="text-lg font-semibold">Trivia Leaderboard</h3>
      </div>
      <ul className="mt-4">
        <li className="flex justify-between border-b p-2 bg-white text-black rounded">
          <span>John Doe</span> <span>100 pts</span>
        </li>
        {/* Map actual data here */}
      </ul>
    </div>
  );
};

export default Leaderboard;
