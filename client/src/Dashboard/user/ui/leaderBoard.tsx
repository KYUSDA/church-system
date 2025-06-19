import { useState, useEffect } from "react";
import axios from "axios";
import { getBaseUrl } from "../../../services/authService";
import useUserData from "../../../session/authData";
interface LeaderboardEntry {
  _id: number;
  firstName: string;
  scores: number;
}

const LeaderboardSection = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userName, setUserName] = useState<string | null>(null);
  const baseUrl = getBaseUrl();
  const { userData } = useUserData();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user/get-scores`);
        setLeaderboard(response.data.users);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    if (userData) {
      setUserName(userData.firstName);
    }

    fetchLeaderboard();
  }, [baseUrl, userData]);

  return (
    <div className="bg-purple-100 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-center mb-4">
        🏆 Bible Trivia Leaderboard 🏆
      </h3>
      <div className="overflow-y-auto max-h-80">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-purple-200">
              <th className="p-2">Rank</th>
              <th className="p-2">Member</th>
              <th className="p-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((member, index) => (
                <tr
                  key={member._id}
                  className={`border-b ${
                    member.firstName === userName ? "font-bold" : ""
                  }`}
                >
                  <td className="p-2 font-bold">
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : index + 1}
                  </td>
                  <td className="p-2">
                    {member.firstName}{" "}
                    {member.firstName === userName && (
                      <span className="text-green-600">(You)</span>
                    )}
                  </td>
                  <td className="p-2 text-blue-600 font-semibold">
                    {member.scores}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-600">
                  No trivia scores available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardSection;
