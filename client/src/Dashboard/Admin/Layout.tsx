import React, { useState } from "react";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64 ${
          isSidebarOpen ? "translate-x-0 w-64 z-[100]" : "-translate-x-full"
        }`}>
        <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      {/* <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "" : "lg:ml-64"}`}> */}
      <div className="flex flex-col flex-grow overflow-y-auto">
        {/* Topbar */}
        <Topbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Page Content Wrapper */}
          <div className="flex-1 flex flex-col p-2">{children}</div>
        </div>
      </div>
  );
};

export default AdminLayout;
