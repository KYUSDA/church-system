import React from 'react';
import CommunitySection from '../ui/CommunitySection';
import PersonalGoals from '../ui/PersonalGoals';
import useUserData from '../components/userdata';
import LeaderboardSection from '../ui/leaderBoard';
import ProfileStats from '../ui/profileStats';
import SubscriptionSection from '../ui/devotionSubscription';
import { getTimeOfDayGreeting } from '../components/NavBar';

const DashboardHome: React.FC = () => {
  const { user } = useUserData();

  if(!user) return null;

  return (
    <div className="flex w-full">
      <div className='w-full'>
        <h1 className="text-2xl font-bold text-gray-900 text-center mt-2 lg:hidden">{getTimeOfDayGreeting()} {user.firstName}😊</h1>
       
        {/* Stats Grid */}
       <ProfileStats user={user} />

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subscription Section */}
         <SubscriptionSection user={user} />

          {/* Personal Goals Section */}
          <PersonalGoals />
        </div>

        <div className="grid grid-cols-2 gap-8 m-4 max-lg:grid-cols-1">
          <CommunitySection />

          {/* Family Group Section */}
          <div className="p-6">
            <LeaderboardSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
