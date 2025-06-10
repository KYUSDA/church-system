import React, { useEffect, useState } from "react";
import { BellIcon, Settings, LogOutIcon, MenuIcon,HelpCircle } from "lucide-react";
import { useLogout } from "../../hooks/userLogoutHook";
import { NavLink } from "react-router-dom";
import useUserData from "../../session/authData";
import axios from "axios";
import { BASE_URL } from "../../Admin/services/userServices";

interface NavBarProps {
  onMenuToggle: () => void;
}

export const getTimeOfDayGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return "Good Morning";
  if (currentHour < 18) return "Good Afternoon";
  return "Good Evening";
};

const NavBar: React.FC<NavBarProps> = ({ onMenuToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { handleLogout } = useLogout();
  const { userData } = useUserData(); 

  const userId = userData?.id; 

  const [notifications, setNotifications] = useState([]);
const [unreadCount, setUnreadCount] = useState(0);

useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notification/getAll-notification`, {
        withCredentials: true,
      });
      setNotifications(response.data.notifications);
      setUnreadCount(response.data.unreadCount || 0);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  if (userId) {
    fetchNotifications();
  }
}, [userId]);


  const logout = () => {
    handleLogout();
    setMenuOpen(false);
  };

  return (
    <div className="flex justify-between items-center shadow-md bg-white border-b border-gray-200 px-4 py-3">
      {/* Left side: Menu Button, Title, and Email */}
      <div className="flex space-x-4 items-center">
        {/* Menu Button for Small Screens */}
        <button
          className="lg:hidden p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          onClick={onMenuToggle}
        >
          <MenuIcon className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="hidden text-2xl font-bold text-gray-900 lg:flex">
          {getTimeOfDayGreeting()}, {userData?.firstName} 😊
        </h1>
      </div>

      {/* Right side: Avatar with Dropdown */}
      <div className="relative">
        <button
          className="flex items-center space-x-2 p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="User Menu"
          title="User Menu"
        >
          <img
            src={
              userData?.avatar?.url ||
              "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"
            }
            alt="User Avatar"
            className="h-8 w-8 rounded-full object-cover"
          />
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
            <NavLink
              className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
              aria-label="Notifications"
              title="Notifications"
              to={"/member/user-notifications"}
            >
              <BellIcon className="w-5 h-5 mr-2 text-blue-600" />
              Notifications
              {unreadCount > 0 && (
                <span className="ml-auto bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </NavLink>
            <NavLink
              className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
              aria-label="Account"
              title="Account"
              to={"/member/settings"}
            >
              <Settings className="w-5 h-5 mr-2 text-blue-600" />
              Account
            </NavLink>
            <NavLink
              className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
              aria-label="Report Issue"
              title="Report Issue"
              to={"/member/report-issue"}
            >
              <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
              Report Issue
            </NavLink>
            <button
              className="flex items-center px-4 py-2 hover:bg-red-100 w-full text-left text-red-600"
              onClick={logout}
              aria-label="Logout"
              title="Logout"
            >
              <LogOutIcon className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
