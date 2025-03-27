import React, { useState } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar - Show only when open on small screens */}
      <div
        className={`fixed left-0 top-0 w-64 h-screen text-white transform transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? "translate-x-0 z-[100]" : "-translate-x-full"} lg:translate-x-0`}
      >
        <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content (Topbar + Page Content) */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "" : "lg:ml-64"}`}>
        {/* Topbar */}
        <Topbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Page Content */}
        {/* <div className="flex-1 h-screen overflow-y-auto p-4 bg-gray-100">{children}</div> */}
         {/* Page Content */}
         <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <div className="max-w-full overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
