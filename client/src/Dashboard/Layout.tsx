import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./Sidebar";
import Topbar from "./TopBar";
import useUserData from "@/session/authData";
import { Role } from "@/utils/roles-nav";

function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useUserData();
  const role = user?.role as Role;

  return (
    <SidebarProvider
      className="bg-white"
      style={
        {
          "--sidebar-width": "250px", // or match your sidebar width
          "--header-height": "64px", // match Topbar height
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" userRole={role} />

      <SidebarInset className="flex flex-col min-h-screen bg-white">
        <Topbar />

        <main className="flex-1 p-4 md:p-6 bg-white overflow-auto">
          <div className="container mx-auto max-w-screen-2xl">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Layout;
