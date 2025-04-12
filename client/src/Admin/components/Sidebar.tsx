import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { NavLink} from "react-router-dom";

import {
  LineStyle,
  PermIdentity,
  Storefront,
  PeopleOutline,
  CalendarViewDayOutlined,
  MailOutline,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@mui/icons-material";
import { HelpCircleIcon, Mail,X } from 'lucide-react';

const Sidebar = ({ isOpen, closeSidebar }: { isOpen: boolean; closeSidebar: () => void }) => {
  const location = useLocation(); // Get the current route

  return (
  
    <div className={`fixed top-0 left-0 h-screen ${isOpen  ? "translate-x-0 w-64" : "-translate-x-full" } lg:relative lg:translate-x-0 lg:w-64`}>
       <nav className="relative transition-all duration-300 ease-in-out">
        
        {/* menu close button */}
        <div className="flex justify-end">
      {/* Close button */}
      <button
        className="lg:hidden p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
        onClick={closeSidebar}
      >
        <X className="w-6 h-6 text-gray-700" />
      </button>
    </div>
          
          
      {/* Dashboard Section */}
      <div className="flex-1 overflow-y-auto p-4">
      <div className="mb-2">
        <h3 className="text-sm text-gray-400">Dashboard</h3>
        <ul className="list-none p-1">
          <Link to="/admin/dashboard" className="no-underline">
            <li
              className={`p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200 ${
                location.pathname === "/admin/dashboard" ? "bg-gray-300 font-semibold" : ""
              }`}
            >
              <LineStyle className="mr-2 text-lg" />
              Home
            </li>
          </Link>
        </ul>
      </div>

      {/* Quick Menu Section */}
      <div className="mb-2">
        <h3 className="text-sm text-gray-400">Quick Menu</h3>
        <ul className="list-none p-1">
          <Link to="/admin/users" className="no-underline">
            <li
              className={`p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200 ${
                location.pathname === "/admin/users" ? "bg-gray-300 font-semibold" : ""
              }`}
            >
              <PermIdentity className="mr-2 text-lg" />
              Users
            </li>
          </Link>
          <Link to="/admin/departments" className="no-underline">
            <li
              className={`p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200 ${
                location.pathname === "/admin/departments" ? "bg-gray-300 font-semibold" : ""
              }`}
            >
              <Storefront className="mr-2 text-lg" />
              Departments
            </li>
          </Link>
          <Link to="/admin/families" className="no-underline">
            <li
              className={`p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200 ${
                location.pathname === "/admin/families" ? "bg-gray-300 font-semibold" : ""
              }`}
            >
              <PeopleOutline className="mr-2 text-lg" />
              Families
            </li>
          </Link>
          <Link to="/admin/calendar" className="no-underline">
            <li
              className={`p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200 ${
                location.pathname === "/admin/calendar" ? "bg-gray-300 font-semibold" : ""
              }`}
            >
              <CalendarViewDayOutlined className="mr-2 text-lg" />
              Calendar
            </li>
          </Link>
        </ul>
      </div>

      {/* Notifications Section */}
      <div className="mb-2">
        <h3 className="text-sm text-gray-400">Notifications</h3>
        <ul className="list-none p-1">
          <Link to="/admin/messages" className="no-underline">
            <li
              className={`p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200 ${
                location.pathname === "/admin/messages" ? "bg-gray-300 font-semibold" : ""
              }`}
            >
              <ChatBubbleOutline className="mr-2 text-lg" />
              Messages
            </li>
          </Link>
          <Link to="/admin/create-notification" className="no-underline">
            <li
              className={`p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200 ${
                location.pathname === "/admin/create-notification" ? "bg-gray-300 font-semibold" : ""
              }`}
            >
              <Mail className="mr-2 text-lg" />
              Bulk Emails
            </li>
          </Link>
        </ul>
      </div>

              {/* more functionalities */}
      <div className="mb-2">
        <h3 className="text-sm text-gray-400">Actions</h3>
        <ul className="list-none p-1">
        <Link to="/admin/prayers" className="no-underline">
          <li className={`p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200 ${
                location.pathname === "/admin/prayers" ? "bg-gray-300 font-semibold" : ""
              }`}>
            <MailOutline className="mr-2 text-lg" />
            Prayer Requests
          </li>
          </Link>
          <Link to="/admin/weekly-quiz" className="no-underline">
          <li className={`p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200 ${
                location.pathname === "/admin/weekly-quiz" ? "bg-gray-300 font-semibold" : ""
              }`}>
            <HelpCircleIcon className="mr-2 text-lg" />
            Weekly Quiz
          </li>
          </Link>
   
          <Link to="/admin/admin-manage" className="no-underline">
          <li className="p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200">
            <WorkOutline className="mr-2 text-lg" />
            Manage
          </li>
          </Link>

        </ul>
      </div>

      </div>
      </nav>
    </div>
  );
};

export default Sidebar;
