import React, { ReactNode } from 'react';
import MainFooter from './MainFooter';
import Header from '../Navbar/Header';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      {children}
      <MainFooter />
    </>
  );
}

export default Layout;
