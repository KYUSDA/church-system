import React, { useEffect, useState } from 'react';
import CommunitySection from '../ui/CommunitySection';
import PersonalGoals from '../ui/PersonalGoals';
import useUserData from '../components/userdata';
import LeaderboardSection from '../ui/leaderBoard';
import ProfileStats from '../ui/profileStats';
import SubscriptionSection from '../ui/devotionSubscription';
import { getTimeOfDayGreeting } from '../components/NavBar';
import BirthdayModal from '../../Auth/birthday';

const DashboardHome: React.FC = () => {
  const { user } = useUserData();
  const [showModal, setShowModal] = useState(false); // Default to false

  useEffect(() => {
    if (!user) return;

    const hasSeenBirthdayModal = localStorage.getItem("birthdayModalSeen");

    if (!user.birthday && !hasSeenBirthdayModal) {
      setShowModal(true);
    }
  }, [user]);

  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.setItem("birthdayModalSeen", "true");
  };

  if (!user) return null;

  return (
    <div className="flex w-full">
      <BirthdayModal isOpen={showModal} onClose={handleCloseModal} />
      <div className='w-full'>
        <h1 className="text-2xl font-bold text-gray-900 text-center mt-2 lg:hidden">
          {getTimeOfDayGreeting()} {user.firstName}😊
        </h1>
       
        {/* Stats Grid */}
        <ProfileStats user={user} />

        {/* Content Sections */}
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
