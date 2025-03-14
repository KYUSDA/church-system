import { useState, useEffect } from 'react';
import { scores } from '../../Dummy/leaderboard';

const LeaderboardSection = () => {
    const [leaderboard, setLeaderboard] = useState<{ id: number; name: string; score: number; }[]>([]);

    useEffect(() => {
        // Set leaderboard data from dummy data
        setLeaderboard(scores);
    }, []);

    return (
        <div className="bg-purple-100 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Bible Trivia Leaderboard</h3>
            <div className="overflow-y-auto max-h-80">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2">Rank</th>
                            <th className="p-2">Member</th>
                            <th className="p-2">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.length > 0 ? (
                            leaderboard.map((member, index) => (
                                <tr key={member.id} className="border-b">
                                    <td className="p-2 font-bold">{index + 1}</td>
                                    <td className="p-2">{member.name}</td>
                                    <td className="p-2 text-blue-600 font-semibold">{member.score}</td>
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