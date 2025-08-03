import { Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { TUser } from "../../../session/authData";

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
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 my-8">
      {/* Family Group */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Family Group</h3>
          <span className="text-sm font-bold text-blue-600">
            {user?.familyLocated || "Not allocated"}
          </span>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Badges</h3>
          <span className="flex gap-1 text-blue-600">
            {badges > 0 ? (
              [...Array(badges)].map((_, index) => (
                <Tooltip key={index} title={`Badge ${index + 1}`}>
                  <span>⭐</span>
                </Tooltip>
              ))
            ) : (
              <span>No badges yet</span>
            )}
          </span>
        </div>
      </div>

      {/* Most Valuable Member */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Most Valuable Member (MVM)
          </h3>
          <span className="text-xl font-bold text-blue-600">
            {yearsActive} {yearsActive === 1 ? "year" : "years"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
