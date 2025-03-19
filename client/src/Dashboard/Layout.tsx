import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import ChatBot from "./ui/chatBot";
import { Toaster } from 'sonner';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar on the left */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64 ${
          isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full"
        }`}
        style={{ zIndex: 50 }}
      >
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main content area */}
        <div className="flex flex-col flex-grow overflow-y-auto">
          {/* Navbar */}
          <NavBar onMenuToggle={toggleSidebar} />
          {/* Dashboard content */}
          <div className={`px-4 bg-blue-50 h-full overflow-y-auto `}>
            <Toaster />
            {children}
            <ChatBot />
          </div>
        </div>
      </div>
  );
};

export default DashboardLayout;
