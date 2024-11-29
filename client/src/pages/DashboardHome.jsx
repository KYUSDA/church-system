import AnalyticsSection from './Member/AnalyticsSection'
import QuickActions from './Member/QuickActions'
import CommunitySection from './Member/CommunitySection'
import PersonalGoals from './Member/PersonalGoals'
import { useAuthContext } from '../context/useAuthcontext'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './Member/NavBar'
import Tooltip from "@mui/material/Tooltip"

const DashboardHome = () => {
    const { user } = useAuthContext();
    const [userData, setUserData] = useState();

    useEffect(() => {
        // const getData = async () => {
        //     const url = `https://kyusdabackend-ghbbf8a8fvete4ax.southafricanorth-01.azurewebsites.net/kyusda/v1/user/${user.id}`;
        //     const resp = await fetch(url);
        //     const data = await resp.json();
        //     setUserData(data);
        // };
        // getData();
        const fakeData = {
            role: "member, family leader, church elder, department leader, patron",
            familyLocated: "Nyeri Family Group"
        };
        setUserData(fakeData);
    }, [user.id]);
    console.log(userData?.role, "user data");
    return (
        <div className="max-w-7xl mx-auto p-8">
            {/* Header */}
            <NavBar user={user} />
            <AnalyticsSection />
            <QuickActions />
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
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
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Badges
                        </h3>
                        <span className="flex gap-1">
                            {/* Display stars based on the number of roles */}
                            <span className="flex gap-1 cursor-pointer">
                                {userData?.role ? (
                                    userData.role.split(',').map((role, index) => (
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
                {/* Devotions Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-xl font-semibold mb-4">Recent Devotions</h3>
                    <div className="space-y-4">
                        {/* Devotion Cards */}
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold">Morning Devotion</h4>
                            <p className="text-sm text-gray-600 mt-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                            <div className="flex justify-between items-center mt-3 text-sm">
                                <span className="text-blue-600">John Doe</span>
                                <span className="text-gray-500">3 hours ago</span>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold">Morning Devotion</h4>
                            <p className="text-sm text-gray-600 mt-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                            <div className="flex justify-between items-center mt-3 text-sm">
                                <span className="text-blue-600">John Doe</span>
                                <span className="text-gray-500">3 hours ago</span>
                            </div>
                        </div>
                    </div>
                </div>


                <PersonalGoals />


            </div>

            <div className="grid grid-cols-2 gap-8 m-4">
                <CommunitySection />

                {/* Family Group Section */}
                <div className="bg-purple-100 rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Your Family Group</h3>
                    <div className="text-center py-8">
                        <img
                            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-state-2130362-1800926.png"
                            alt="Family Group"
                            className="mx-auto h-48"
                        />
                        <h4 className="font-semibold mt-4">Family Group Allocated</h4>
                        <p className="text-gray-600">{userData?.familyLocated}</p>
                        <Link
                            to={`/${userData?.familyLocated}`}
                            className="mt-4 inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardHome
