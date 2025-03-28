import React from 'react';
import { useLocation, Link } from "react-router-dom";
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

const Sidebar = ({ isOpen, closeSidebar }: { isOpen: boolean; closeSidebar: () => void }) => {
  const location = useLocation(); // Get the current route

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-gray-50 w-64 p-5 text-gray-600 transition-transform transform lg:relative lg:translate-x-0 ${
        isOpen ? "translate-x-0 z-[100]" : "-translate-x-full"
      }`}
    >
      {/* Close Button on Mobile */}
      <button className="lg:hidden absolute top-4 right-4 text-gray-600" onClick={closeSidebar}>
        ✖
      </button>

      {/* Dashboard Section */}
      <div className="mb-4">
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
      <div className="mb-4">
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
      <div className="mb-4">
        <h3 className="text-sm text-gray-400">Notifications</h3>
        <ul className="list-none p-1">
        <Link to="/admin/prayers" className="no-underline">
          <li className="p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200">
            <MailOutline className="mr-2 text-lg" />
            Prayer Requests
          </li>
          </Link>
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
        </ul>
      </div>

      {/* Staff Section */}
      <div className="mb-4">
        <h3 className="text-sm text-gray-400">Staff</h3>
        <ul className="list-none p-1">
          <Link to="/admin/admin-manage" className="no-underline">
          <li className="p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200">
            <WorkOutline className="mr-2 text-lg" />
            Manage
          </li>
          </Link>
          <Link to="/admin/reports" className="no-underline">
          <li className="p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200">
            <Report className="mr-2 text-lg" />
            Reports
          </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
