import React, { useEffect, useState } from "react";
import { NotificationsNone, Menu, ArrowDropDown } from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";
import { BASE_URL } from "../services/userServices";
import useUserData from "../../session/authData";
import { useLogout } from "../../hooks/userLogoutHook";

const Topbar = ({ toggleSidebar }: { toggleSidebar?: () => void }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const {user} = useUserData();
  const {handleLogout} = useLogout();


  // Fetch messages and update unread count
  const fetchMessages = async () => {
    try {
      const res = await fetch(`${BASE_URL}/user/get-issues`);
      if (res.ok) {
        const data = await res.json();
        const unreadMessages = data.data.filter((msg: any) => !msg.isRead).length;
        setUnreadCount(unreadMessages);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();

    // Polling every 30 seconds to update unread count dynamically
    const interval = setInterval(fetchMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  if(!user) return null;
  return (
       <div className="flex justify-between items-center sticky top-0 z-50 shadow-md bg-white border-b border-gray-200 px-4 py-3">
      {/* Menu Button for Small Screens */}
      {toggleSidebar && (
        <button className="lg:hidden text-gray-700" onClick={toggleSidebar}>
          <Menu className="text-2xl" />
        </button>
      )}

      
      <NavLink to="/admin/dashboard" className="hidden space-x-3 lg:flex items-center">
      <svg className="h-8 w-8 text-blue-600" viewBox="0 0 24 24">
        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3m6.82 6L12 12.72 5.18 9 12 5.28 18.82 9M17 16l-5 2.72L7 16v-3.73L12 15l5-2.73V16z"></path>
      </svg>
      <span className="text-xl font-bold">KYUSDA</span>
      </NavLink>

      <div className="flex items-center space-x-4 ml-auto">
        {/* Notification Icon */}
        <div className="relative cursor-pointer text-gray-700">
          <Link to="/admin/messages" className="no-underline">
            <NotificationsNone />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                {unreadCount}
              </span>
            )}
          </Link>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              src={user?.avatar?.url ?  user?.avatar?.url : "/kyu.jpg"} 
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-gray-700 font-medium">{user.firstName}</span>
            <ArrowDropDown />
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md">
              <ul className="py-2">
                <Link to="/admin/admin-profile" className="no-underline">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                </Link>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">
                 <button onClick={handleLogout}> Logout</button>
                  </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
