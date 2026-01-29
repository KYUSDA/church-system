import React, { useEffect, useState } from "react";
import BirthdayCard from "./birthdayCard";
import PersonalGoals from "./PersonalGoals";
import useUserData from "../../../session/authData";
import LeaderboardSection from "./leaderBoard";
import ProfileStats from "./profileStats";
import BirthdayModal from "../../../Auth/birthday";
import CalendarSection from "./upcomingEvents";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const DashboardHome: React.FC = () => {
  const { userData, user, loading } = useUserData();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user || !userData) return;

    const hasSeenBirthdayModal = localStorage.getItem("birthdayModalSeen");

    // ✅ Check if birthday is null, undefined, or an invalid date
    const isBirthdayValid =
      userData.birthday && !isNaN(new Date(userData.birthday).getTime());

    if (!isBirthdayValid) {
      if (!hasSeenBirthdayModal || hasSeenBirthdayModal === "false") {
        setShowModal(true);
      }
    } else {
      localStorage.setItem("birthdayModalSeen", "true"); // Prevent future pop-ups
    }
  }, [userData, user]);

  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.setItem("birthdayModalSeen", "true");
  };

  // Show loading state while user data is being fetched
  if (loading || !userData) {
    return (
      <div className="px-4 py-8">
        <div className="space-y-6">
          {/* Profile Stats Skeleton */}
          <Card>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-muted rounded-full"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-6 bg-muted rounded w-1/3"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-8 bg-muted rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Grid Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-6 bg-muted rounded w-1/3"></div>
                      <div className="h-4 w-4 bg-muted rounded"></div>
                    </div>
                    <div className="space-y-3">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="h-16 bg-muted rounded"></div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Loading Indicator */}
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="text-sm font-medium">Loading dashboard...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4">
      <BirthdayModal isOpen={showModal} onClose={handleCloseModal} />

      <div className="w-full">
        <ProfileStats user={userData} />

        {/* upcoming events */}
        <div className="grid grid-cols-1 my-6 lg:grid-cols-2 gap-8">
          <CalendarSection />
          <BirthdayCard />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PersonalGoals />
          <LeaderboardSection />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
