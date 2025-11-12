import { useState, useEffect } from "react";
import axios from "axios";
import { Trophy, Medal, Crown, Zap, TrendingUp } from "lucide-react";
import { getBaseUrl } from "@/services/base_query";
import useUserData from "../../../session/authData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface LeaderboardEntry {
  _id: number;
  firstName: string;
  scores: number;
}

const LeaderboardSection = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const { userData } = useUserData();
  const baseUrl = getBaseUrl();

  useEffect(() => {
    axios.get(`${baseUrl}/user/get-scores`)
      .then(res => setLeaderboard(res.data.users))
      .catch(console.error);
  }, [baseUrl]);

  const getRankDisplay = (index: number) => {
    const displays = ["🥇", "🥈", "🥉"];
    return displays[index] || `#${index + 1}`;
  };

  const getRankColor = (index: number) => {
    const colors = ["text-yellow-600", "text-gray-500", "text-amber-600"];
    return colors[index] || "text-muted-foreground";
  };

  const isCurrentUser = (name: string) => name === userData?.firstName;

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <Zap className="h-3 w-3 text-blue-500 absolute -top-1 -right-1" />
            </div>
            <CardTitle className="text-lg">Trivia Champions</CardTitle>
          </div>
          <Badge variant="secondary" className="gap-1">
            <TrendingUp className="h-3 w-3" />
            Top {Math.min(leaderboard.length, 10)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {leaderboard.length > 0 ? (
          <div className="space-y-3">
            {leaderboard.slice(0, 10).map((member, index) => {
              const isMe = isCurrentUser(member.firstName);
              const isTopThree = index < 3;
              
              return (
                <div key={member._id}>
                  <div className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isMe ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'
                  }`}>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`text-lg font-bold ${getRankColor(index)}`}>
                        {getRankDisplay(index)}
                      </span>
                      {isTopThree && <Crown className={`h-4 w-4 ${getRankColor(index)}`} />}
                    </div>

                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={`text-xs font-medium ${
                        isTopThree ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' : 
                        isMe ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        {member.firstName[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium truncate ${isMe ? 'font-bold' : ''}`}>
                          {member.firstName}
                        </span>
                        {isMe && <Badge variant="outline" className="text-xs px-1">You</Badge>}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Medal className="h-3 w-3 text-blue-500" />
                      <span className="font-bold text-sm text-blue-600">
                        {member.scores.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  {index < Math.min(leaderboard.length - 1, 9) && <Separator className="my-1" />}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Trophy className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">No scores yet</p>
            <p className="text-xs mt-1">Start playing to join the leaderboard!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeaderboardSection;
