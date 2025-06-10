
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { useLogout } from "../../hooks/userLogoutHook";
import useUserData from "../../session/authData";

interface MobileNavbarProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ menuOpen, setMenuOpen }) => {

  const { handleLogout } = useLogout();
  const { userData } = useUserData();

  const handleLogOut = () => {
    handleLogout();
    setMenuOpen(false); 
  };

  return (
    <nav
      className={`mobile-nav fixed top-0 right-0 w-64 bg-color h-full transition-transform duration-300 ease-in-out ${
        menuOpen ? "translate-x-0" : "translate-x-full"
      } z-10`}
    >
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-4 right-4 text-white"
      >
        <FiX size={24} />
      </button>
      <ul className="flex flex-col gap-6 uppercase text-sm text-start pt-16 pl-12">
        <li>
          <Link to="/" className="nav-link underline-transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/families" className="nav-link underline-transition">
            Families
          </Link>
        </li>
        <li>
          <Link to="/departments" className="nav-link underline-transition">
            Departments
          </Link>
        </li>
        <Link to="/church-gallery" className="nav-link underline-transition">
          Gallery
        </Link>

        {/* Auth Buttons */}
        {userData?.email ? (
          <div className="flex flex-col gap-3">
            <Link to="/member" className="nav-link">
              Dashboard
            </Link>
            <button
              onClick={handleLogOut}
              className="rounded-md px-4 py-2 bg-[#12ac8e] text-white"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <Link
              to="/signUp"
              className="text-white text-sm border p-2 rounded-md mr-4"
            >
              REGISTER
            </Link>
            <Link to="/signIn" className="text-white text-sm">
              LOGIN
            </Link>
          </div>
        )}

        {/* Donate Button */}
        <div className="mt-6">
          <Link
            to="/donation"
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            SUPPORT US
          </Link>
        </div>
      </ul>
    </nav>
  );
};

export default MobileNavbar;
