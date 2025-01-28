
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
          <span className="text-[rgba(238,238,238,0.75)] font-bold">KYUSDA CHURCH</span>
        </Link>
      </div>

      {/* navlinks */}
      <div className="nav-links flex flex-grow justify-center">
  <ul className="flex gap-6 uppercase text-sm">
    <li>
      <Link
        to="/"
        className="relative group text-sm text-[rgba(238,238,238,0.75)] underline-transition"
      >
        Home
      </Link>
    </li>
    <li>
      <Link
        to="/families"
        className="relative group  text-sm text-[rgba(238,238,238,0.75)] underline-transition"
      >
        Families
      </Link>
    </li>
    <li>
      <Link
        to="/departments"
        className="relative group  text-sm text-[rgba(238,238,238,0.75)] underline-transition"
      >
        Departments
      </Link>
    </li>
    <li>
      <Link
        to="#"
        className="relative group  text-sm text-[rgba(238,238,238,0.75)] underline-transition"
      >
        Contact Us
      </Link>
    </li>
  </ul>
</div>

<style jsx>{`
  .underline-transition {
    position: relative;
    display: inline-block;
  }

  .underline-transition::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -2px; /* Adjust based on text */
    left: 0;
    background-color:#3b82f6;
    transform: scaleX(0);
    transform-origin: bottom left;
    transition: transform 0.3s ease-out;
  }

  .underline-transition:hover::after {
    transform: scaleX(1);
  }
`}</style>


      <div className="flex gap-3 items-center">
        {user?.email ? (
          <div className="flex gap-3">
            <Link to="/member" className="text-black">Dashboard</Link>
            <button onClick={handleLogOut} className="rounded-md px-4 py-2 bg-[#12ac8e] text-white">Log Out</button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link to="/signUp" className="text-[rgba(238,238,238,0.75)] text-sm register-btn">REGISTER</Link>
            <Link to="/signIn" className="text-[rgba(238,238,238,0.75)] text-sm login-btn">LOGIN</Link>
          </div>
        )}

<style jsx>{`
  .register-btn {
    position: relative;
    display: inline-block;
  }

  .register-btn::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -2px; /* Adjust based on text */
    left: 0;
    background-color:#3b82f6;
    transform: scaleX(1);
    transform-origin: bottom left;
    transition: transform 0.3s ease-out;
  }

  .register-btn:hover::after {
    transform: scaleX(0);
  }

  .login-btn::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: black;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease-out;
  }

  .login-btn:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`}</style>
        <div className="donate-btn px-4 py-2 ">
          <Link to="/donation" className="text-[rgba(238,238,238,0.75)] font-bold font-sans">SUPPORT US</Link>
        </div>
      </div>
    </header>
  );
};


export default Header;
