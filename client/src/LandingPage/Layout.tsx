import React, { ReactNode } from "react";
import MainFooter from "./MainFooter";
import Header from "./Navbar/Header";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      <main className="flex-grow">{children}</main>
      <MainFooter />
    </div>
  );
}

export default Layout;
