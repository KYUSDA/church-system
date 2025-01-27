
import React from "react";
import { Link } from "react-router-dom";
import KyuSda from "../../assets/kyusdaLogo.png";
import { useLogout } from "../../hooks/userLogoutHook";
import '../../global/global.css';

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { logout } = useLogout();

  const handleLogOut = () => {
    logout();
  }

  return (
    <header className="bg-color main-header flex justify-between items-center px-6 py-2">
      <div className="logo flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={KyuSda} alt="kyusda logo" className="w-12 h-12" />
          <span className="text-black">KYUSDA CHURCH</span>
        </Link>
      </div>

      {/* navlinks */}
      <div className="nav-links flex flex-grow justify-center">
      <ul className="flex gap-6 text-black uppercase font-semibold text-sm">
        <li>
          <Link to="/" className="relative group hover:text-blue-700">
            Home
            <span className="underline-transition"></span>
          </Link>
        </li>
        <li>
          <Link to="/families" className="relative group hover:text-orange-600">
            Families
            <span className="underline-transition"></span>
          </Link>
        </li>
        <li>
          <Link to="/departments" className="relative group hover:text-orange-600">
            Departments
            <span className="underline-transition"></span>
          </Link>
        </li>
        <li>
          <Link to="#" className="relative group hover:text-orange-600">
            Contact Us
            <span className="underline-transition"></span>
          </Link>
        </li>
      </ul>
  </div>

      <div className="flex gap-3 items-center">
        {user?.email ? (
          <div className="flex gap-3">
            <Link to="/member" className="text-black">Dashboard</Link>
            <button onClick={handleLogOut} className="rounded-md px-4 py-2 bg-[#12ac8e] text-white">Log Out</button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link to="/signUp" className="text-black">Register</Link>
            <Link to="/signIn" className="text-black">Login</Link>
          </div>
        )}

        <div className="donate-btn bg-green-700 rounded-lg px-4 py-2 hover:bg-opacity-80">
          <Link to="/donation" className="text-white">Support Us</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
