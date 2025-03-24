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

const Sidebar: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-50 sticky top-[50px]">
      <div className="p-5 text-gray-600">
        <div className="mb-4">
          <h3 className="text-sm text-gray-400">Dashboard</h3>
          <ul className="list-none p-1">
            <Link to="/admin" className="no-underline">
              <li className="p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200 bg-gray-200">
                <LineStyle className="mr-2 text-lg" />
                Home
              </li>
            </Link>
            <li className="p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200">
              <Timeline className="mr-2 text-lg" />
              Analytics
            </li>
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
            <Link to="/admin/calender" className="no-underline">
              <li className="p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200">
                <CalendarViewDayOutlined className="mr-2 text-lg" />
                Calender
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
            <li className="p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200">
              <DynamicFeed className="mr-2 text-lg" />
              Feedback
            </li>
            <li className="p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200">
              <ChatBubbleOutline className="mr-2 text-lg" />
              Messages
            </li>
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
              <Timeline className="mr-2 text-lg" />
              Analytics
            </li>
            <li className="p-2 cursor-pointer flex items-center rounded-lg hover:bg-gray-200">
              <Report className="mr-2 text-lg" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
