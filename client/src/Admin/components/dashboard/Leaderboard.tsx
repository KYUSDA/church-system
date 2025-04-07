import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { useGetMembersQuery } from "../../services/userServices";
import { TUser } from "../../services/userServices";

const medalIcons = [
  "🥇", // Gold - 1st place
  "🥈", // Silver - 2nd place
  "🥉", // Bronze - 3rd place
];

const Leaderboard = () => {
  const { data: membersData } = useGetMembersQuery();
  const [leaderboard, setLeaderboard] = useState<{ name: string; score: number }[]>([]);

  useEffect(() => {
    if (membersData?.users) {
      // Fetch and sort users by score in descending order
      const sortedUsers = membersData.users
        .map((user: TUser) => ({
          name: `${user.firstName} ${user.lastName}`,
          score: Math.floor(Math.random() * 200), // Replace with actual score when available
        }))
        .sort((a, b) => b.score - a.score);

      setLeaderboard(sortedUsers);
    }
  }, [membersData]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center gap-4">
        <Trophy size={28} className="text-yellow-500" />
        <h3 className="text-lg font-semibold">Trivia Leaderboard</h3>
      </div>
      <ul className="mt-4">
        {leaderboard.map((user, index) => (
          <li
            key={index}
            className="flex justify-between border-b p-2 bg-white text-black rounded items-center"
          >
            <span className="flex items-center gap-2">
              {index < 3 ? medalIcons[index] : "🏅"} {user.name}
            </span>
            <span className="font-semibold">{user.score} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
