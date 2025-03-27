import React from 'react';
import {
  LineStyle,
  Timeline,
  PermIdentity,
  Storefront,
  PeopleOutline,
  CalendarViewDayOutlined,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, closeSidebar }: { isOpen: boolean; closeSidebar: () => void }) => {
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
        <div className="mb-4">
          <h3 className="text-sm text-gray-400">Dashboard</h3>
          <ul className="list-none p-1">
            <Link to="/admin/dashboard" className="no-underline">
              <li className="p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200 bg-gray-200">
                <LineStyle className="mr-2 text-lg" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-sm text-gray-400">Quick Menu</h3>
          <ul className="list-none p-1">
            <Link to="/admin/users" className="no-underline">
              <li className="p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200">
                <PermIdentity className="mr-2 text-lg" />
                Users
              </li>
            </Link>
            <Link to="/admin/departments" className="no-underline">
              <li className="p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200">
                <Storefront className="mr-2 text-lg" />
                Departments
              </li>
            </Link>
            <Link to="/admin/families" className="no-underline">
              <li className="p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200">
                <PeopleOutline className="mr-2 text-lg" />
                Families
              </li>
            </Link>
            <Link to="/admin/calendar" className="no-underline">
              <li className="p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200">
                <CalendarViewDayOutlined className="mr-2 text-lg" />
                Calendar
              </li>
            </Link>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-sm text-gray-400">Notifications</h3>
          <ul className="list-none p-1">
            <li className="p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200">
              <MailOutline className="mr-2 text-lg" />
              Mail
            </li>
        
            <Link to="/admin/messages" className="no-underline">
            <li className="p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200">
              <ChatBubbleOutline className="mr-2 text-lg" />
              Messages
            </li>
            </Link>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-sm text-gray-400">Staff</h3>
          <ul className="list-none p-1">
            <li className="p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200">
              <WorkOutline className="mr-2 text-lg" />
              Manage
            </li>
         
            <li className="p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200">
              <Report className="mr-2 text-lg" />
              Reports
            </li>
          </ul>
        </div>
      </div>
  );
};

export default Sidebar;
