
import React from "react";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { useLogout } from "../../hooks/userLogoutHook";
import useUserData from "../../session/authData";

interface MobileNavbarProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  menuOpen,
  setMenuOpen,
}) => {
  const { handleLogout } = useLogout();
  const { user } = useUserData();

  const handleLogOut = () => {
    handleLogout();
    setMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav
      className={`mobile-nav fixed top-0 right-0 w-64 bg-color h-full transition-transform duration-300 ease-in-out ${
        menuOpen ? "translate-x-0" : "translate-x-full"
      } z-50`}
    >
      {/* Close Button */}
      <button
        onClick={closeMenu}
        className="absolute top-4 right-4 text-white"
        aria-label="Close menu"
      >
        <FiX size={24} />
      </button>

      {/* Navigation Links */}
      <ul className="flex flex-col gap-6 uppercase text-sm text-start pt-16 pl-8 pr-6">
        <li>
          <Link
            to="/"
            onClick={closeMenu}
            className="nav-link underline-transition"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/about"
            onClick={closeMenu}
            className="nav-link underline-transition"
          >
            About
          </Link>
        </li>

        <li>
          <Link
            to="/families"
            onClick={closeMenu}
            className="nav-link underline-transition"
          >
            Families
          </Link>
        </li>

        <li>
          <Link
            to="/departments"
            onClick={closeMenu}
            className="nav-link underline-transition"
          >
            Departments
          </Link>
        </li>

        <li>
          <Link
            to="/resources"
            onClick={closeMenu}
            className="nav-link underline-transition"
          >
            Resources
          </Link>
        </li>

        <li>
          <Link
            to="/kyusda-magazine"
            onClick={closeMenu}
            className="nav-link underline-transition"
          >
            Magazine
          </Link>
        </li>

        <li>
          <Link
            to="/camp-meeting"
            onClick={closeMenu}
            className="nav-link underline-transition"
          >
            Camp-Meeting
          </Link>
        </li>

        <li>
          <Link
            to="/church-gallery"
            onClick={closeMenu}
            className="nav-link underline-transition"
          >
            Gallery
          </Link>
        </li>

        <li>
          <a
            href="https://blogs.kyusda.org"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="nav-link underline-transition"
          >
            Blogs
          </a>
        </li>

        {/* Authentication */}
        {user ? (
          <li className="flex flex-col gap-4 mt-2">
            <Link
              to="/member/dashboard"
              onClick={closeMenu}
              className="nav-link underline-transition"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogOut}
              className="rounded-md px-4 py-2 bg-[#12ac8e] text-white text-left uppercase"
            >
              Log Out
            </button>
          </li>
        ) : (
          <li className="flex flex-col gap-4 mt-2">
            <Link
              to="/signUp"
              onClick={closeMenu}
              className="text-white text-sm border border-white p-2 rounded-md"
            >
              REGISTER
            </Link>

            <Link
              to="/signIn"
              onClick={closeMenu}
              className="text-white text-sm"
            >
              LOGIN
            </Link>
          </li>
        )}

        {/* Support Us */}
        <li className="mt-4">
          <Link
            to="/donation"
            onClick={closeMenu}
            className="inline-block text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            SUPPORT US
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavbar;
