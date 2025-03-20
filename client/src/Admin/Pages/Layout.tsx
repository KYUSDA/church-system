import React from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

const adminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Topbar />
      <div className="flex">
        <div className="w-64 h-screen">
          <Sidebar />
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default adminLayout;