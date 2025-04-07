import React, { useEffect, useState } from 'react';
import CommunitySection from '../ui/CommunitySection';
import PersonalGoals from '../ui/PersonalGoals';
import useUserData from '../components/userdata';
import LeaderboardSection from '../ui/leaderBoard';
import ProfileStats from '../ui/profileStats';
import SubscriptionSection from '../ui/devotionSubscription';
import { getTimeOfDayGreeting } from '../components/NavBar';
import BirthdayModal from '../../Auth/birthday';
import SessionExpiryNotifier from '../components/SessionExpired';

const DashboardHome: React.FC = () => {
  const { user } = useUserData();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user) return;

    const hasSeenBirthdayModal = localStorage.getItem("birthdayModalSeen");

    // ✅ Check if birthday is null, undefined, or an invalid date
    const isBirthdayValid = user.birthday && !isNaN(new Date(user.birthday).getTime());

    if (!isBirthdayValid) {
      if (!hasSeenBirthdayModal || hasSeenBirthdayModal === "false") {
        setShowModal(true);
      }
    } else {
      localStorage.setItem("birthdayModalSeen", "true"); // Prevent future pop-ups
    }
  }, [user]);

  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.setItem("birthdayModalSeen", "true");
  };

  if (!user) return null;

  return (
    <div className="flex w-full">
      <SessionExpiryNotifier />
      <BirthdayModal isOpen={showModal} onClose={handleCloseModal} />
      <div className='w-full'>
        <h1 className="text-2xl font-bold text-gray-900 text-center mt-2 lg:hidden">
          {getTimeOfDayGreeting()} {user.firstName} 😊
        </h1>

        <ProfileStats user={user} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SubscriptionSection user={user} />
          <PersonalGoals />
        </div>

        <div className="grid grid-cols-2 gap-8 m-4 max-lg:grid-cols-1">
          <CommunitySection />
          <div className="p-6">
            <LeaderboardSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
