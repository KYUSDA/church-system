import React, { useState } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import {Toaster} from 'sonner'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 w-64 h-screen text-white transform transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? "translate-x-0 z-[100]" : "-translate-x-full"} lg:translate-x-0`}
      >
        <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "" : "lg:ml-64"}`}>
        {/* Topbar */}
        <Topbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Page Content Wrapper */}
        <div className="flex-1  p-4 bg-gray-100">
        <Toaster position="top-center" richColors />
          <div className="flex-1 flex flex-col">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
