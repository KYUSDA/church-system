import React, { useEffect, useState } from "react";
import BirthdayCard from "./birthdayCard";
import PersonalGoals from "./PersonalGoals";
import useUserData from "../../../session/authData";
import LeaderboardSection from "./leaderBoard";
import ProfileStats from "./profileStats";
import DevotionSubscriptionFloat from "./devotionSubscription";
import BirthdayModal from "../../../Auth/birthday";
import CalendarSection from "./upcomingEvents";

const DashboardHome: React.FC = () => {
  const { userData, user } = useUserData();
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
  }, [userData]);

  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.setItem("birthdayModalSeen", "true");
  };

  if (!userData) return null;

  return (
    <div className="px-4">
      <BirthdayModal isOpen={showModal} onClose={handleCloseModal} />

      {/* Floating devotion subscription for non-subscribers */}
      <DevotionSubscriptionFloat />

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
