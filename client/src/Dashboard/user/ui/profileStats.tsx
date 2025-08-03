import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Users, Award, Calendar, Star } from "lucide-react";
import { TUser } from "../../../session/authData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ProfileStats = ({ user }: { user: TUser }) => {
  const [badges, setBadges] = useState(0);
  const [yearsActive, setYearsActive] = useState(0);

  useEffect(() => {
    // Calculate badges based on scores (1 badge for every 100 points)
    if (user?.scores) {
      const totalScore = parseInt(user.scores, 10) || 0;
      setBadges(Math.floor(totalScore / 100));
    }

    // Calculate years since registration
    if (user?.createdAt) {
      const years = dayjs().diff(dayjs(user.createdAt), "year");
      setYearsActive(years);
    }
  }, [user]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
      <TooltipProvider>
        {/* Family Group Card */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Family Group
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {user?.familyLocated || "Not allocated"}
              </div>
              {user?.familyLocated && (
                <Badge variant="secondary" className="ml-2">
                  Active
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Your assigned family group
            </p>
          </CardContent>
        </Card>

        {/* Badges Card */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Achievement Badges
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{badges}</div>
            <div className="flex items-center gap-1 mb-2">
              {badges > 0 ? (
                [...Array(Math.min(badges, 5))].map((_, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger>
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Badge {index + 1} - {(index + 1) * 100} points
                      </p>
                    </TooltipContent>
                  </Tooltip>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">
                  No badges yet
                </span>
              )}
              {badges > 5 && (
                <Badge variant="outline" className="ml-1">
                  +{badges - 5}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Earned through quiz participation
            </p>
          </CardContent>
        </Card>

        {/* Most Valuable Member Card */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Years Active
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              {yearsActive} {yearsActive === 1 ? "year" : "years"}
            </div>
            <div className="flex items-center gap-2">
              {yearsActive >= 1 && (
                <Badge
                  variant={yearsActive >= 5 ? "default" : "secondary"}
                  className="text-xs"
                >
                  {yearsActive >= 5 ? "Veteran Member" : "Active Member"}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Member since {dayjs(user?.createdAt).format("YYYY")}
            </p>
          </CardContent>
        </Card>
      </TooltipProvider>
    </div>
  );
};

export default ProfileStats;
