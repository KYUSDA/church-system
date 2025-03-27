import React, { useState } from "react";
import { NotificationsNone, Menu, ArrowDropDown } from "@mui/icons-material";

const Topbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="w-full h-14 bg-white sticky top-0 z-50 flex items-center px-5 justify-between shadow-md">
      {/* Menu Button for Small Screens */}
      <button className="lg:hidden text-gray-700" onClick={toggleSidebar}>
        <Menu className="text-2xl" />
      </button>

      {/* Title (Hidden on Small Screens) */}
      <div className="font-bold text-2xl hidden text-blue-900 cursor-pointer lg:block">
        KYUSDA ADMIN
      </div>

      <div className="flex items-center space-x-4 ml-auto">
        {/* Notification Icon */}
        <div className="relative cursor-pointer text-gray-700">
          <NotificationsNone />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
            2
          </span>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-gray-700 font-medium">John Doe</span>
            <ArrowDropDown />
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
