import React, { useState } from "react";
import { Link } from "react-router-dom";
import KyuSda from "../../assets/logo-kyusda.jpg";
import { useLogout } from "../../hooks/userLogoutHook";
import '../../global/global.css';
import { FiMenu } from "react-icons/fi";
import MobileNavbar from "./MobileNav";
import './nav_bar.css';

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { logout } = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <header className="bg-color main-header flex justify-between items-center px-6 py-2 md:px-12 relative">
      <div className="logo flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={KyuSda} alt="kyusda logo" className="w-12 h-12 rounded-full" />
          <span className="text-[#eeeeee] font-bold">KYUSDA CHURCH</span>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
        <FiMenu size={24} />
      </button>

      {/* Desktop Navlinks and Auth Buttons */}
      <nav className="hidden md:flex items-center justify-between gap-6 text-white w-full">
        {/* Nav Links in the Center */}
        <div className="flex-grow flex justify-center gap-6">
          <Link to="/" className="nav-link underline-transition">Home</Link>
          <Link to="/families" className="nav-link underline-transition">Families</Link>
          <Link to="/departments" className="nav-link underline-transition">Departments</Link>
          <Link to="/church-gallery" className="nav-link underline-transition">Gallery</Link>
          <Link to="#" className="nav-link underline-transition">Contact Us</Link>
        </div>

        {/* Auth Buttons and Donate on the Right */}
        <div className="flex gap-4 items-center">
          {user?.email ? (
            <div className="flex gap-3">
              <Link to="/member" className="nav-link">Dashboard</Link>
              <button onClick={handleLogOut} className="rounded-md px-4 py-2 bg-[#12ac8e] text-white">Log Out</button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/signUp" className="text-white text-sm register-btn">REGISTER</Link>
              <Link to="/signIn" className="text-white text-sm">LOGIN</Link>
            </div>
          )}

          {/* Donate Button */}
          <div className="donate-btn">
            <Link to="/donation" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              SUPPORT US
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <MobileNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </header>
  );
};

export default Header;
