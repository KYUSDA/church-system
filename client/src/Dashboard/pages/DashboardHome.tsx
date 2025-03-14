import React, { useState, useEffect } from 'react';
import AnalyticsSection from '../ui/AnalyticsSection';
import CommunitySection from '../ui/CommunitySection';
import PersonalGoals from '../ui/PersonalGoals';
import useUserData from '../components/userdata';
import Tooltip from "@mui/material/Tooltip";
import LeaderboardSection from '../ui/leaderBoard';

const DashboardHome: React.FC = () => {
  const { user } = useUserData();
  const [userData, setUserData] = useState<any>();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscription = async () => {
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    try {
      const response = await fetch("https://example.com/api/subscribe-devotions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Subscription successful! You'll receive daily devotions.");
        setEmail(""); // Clear input after successful subscription
      } else {
        setMessage("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    if (!user) return;
    const fakeData = {
      role: "member, family leader, church elder, department leader, patron",
      familyLocated: "Nyeri Family Group"
    };
    setUserData(fakeData);
  }, [user]);

  return (
    <div className="flex w-full">
      <div className='w-full'>
        <h1 className="text-2xl font-bold text-gray-900 text-center mt-2 lg:hidden">Good Morning 😊!</h1>
        <AnalyticsSection />
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 max-sm:flex-col">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Family Group
              </h3>
              <span className="text-xl font-bold text-blue-600">
                {userData?.familyLocated ? userData?.familyLocated : 'Not allocated'}
              </span>
            </div>
          </div>
          <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-100'>
            <div className="flex items-center justify-between  max-sm:flex-col">
              <h3 className="text-lg font-semibold text-gray-900">
                Badges
              </h3>
              <span className="flex gap-1">
                {/* Display stars based on the number of roles */}
                <span className="flex gap-1 cursor-pointer">
                  {userData?.role ? (
                    userData.role.split(',').map((role: string, index: number) => (
                      <Tooltip key={index} title={role.trim()}>
                        <span>⭐</span>
                      </Tooltip>
                    ))
                  ) : (
                    <span>No role defined</span>
                  )}
                </span>
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex flex-col items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Most valuable member (MVM)
              </h3>
              <span className="text-xl font-bold text-blue-600">
                {userData?.mvm ? userData?.mvm : '3'} years
              </span>
            </div>
          </div>
          {/* Add more stat cards */}
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subscription Section */}
          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold mb-2">Subscribe for Daily Devotions</h4>
            <p className="text-sm text-gray-600 mb-3">
              Enter your email to receive devotions directly to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSubscription}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Subscribe
              </button>
            </div>
            {message && <p className="mt-2 text-sm text-red-700">{message}</p>}
          </div>

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
