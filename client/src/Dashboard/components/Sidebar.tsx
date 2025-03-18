import React from "react";
import { NavLink} from "react-router-dom";
import { X, LayoutDashboard, BookOpen, ShieldCheck, HelpCircle, Send, MessageCircleQuestion } from "lucide-react";
import useUserData from "./userdata";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {

	const { user } = useUserData();
 
	const fullname = user?.firstName + ' ' + user?.lastName;

  const navItems = [
    { path: "/member/dashboard", name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: "/member/resources", name: "Resources", icon: <BookOpen className="w-5 h-5" /> },
    { path: "/member/defend-your-faith", name: "Defend Your Faith", icon: <ShieldCheck className="w-5 h-5" /> },
    { path: "/member/bibleTrivia", name: "Bible Trivia", icon: <HelpCircle className="w-5 h-5" /> },
    { path: "/member/submit-prayer-request", name: "Prayer Requests", icon: <Send className="w-5 h-5" /> },
    { path: "/member/communication-center", name: "Communication Center", icon: <MessageCircleQuestion className="w-5 h-5" /> },
  ];

	return (
		<div className={`fixed top-0 left-0 h-full ${isOpen  ? "translate-x-0 w-64" : "-translate-x-full" } lg:relative lg:translate-x-0 lg:w-64`}>
		  <nav className="relative transition-all duration-300 ease-in-out">
			<div className="p-6 border-b flex justify-between items-center">
			  <NavLink to="/" className="flex items-center space-x-3">
				<svg className="h-8 w-8 text-blue-600" viewBox="0 0 24 24">
				  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3m6.82 6L12 12.72 5.18 9 12 5.28 18.82 9M17 16l-5 2.72L7 16v-3.73L12 15l5-2.73V16z"></path>
				</svg>
				<span className="text-xl font-bold">KYUSDA</span>
			  </NavLink>
			  <button
				className="lg:hidden p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
				onClick={toggleSidebar}>
				<X className="w-6 h-6 text-gray-700" />
				</button>
			</div>
	
			<div className="p-4 flex flex-col justify-between h-[calc(100%-5rem)]">
			  <div className="flex items-center space-x-4 mb-6">
				<img
				  src={user?.avatar?.url || "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"}
				  alt="Profile"
				  className="h-12 w-12 rounded-full object-cover"
				/>
				<div>
				  <h3 className="font-semibold truncate overflow-hidden whitespace-nowrap max-w-[10rem]">{fullname}</h3>
				</div>
			  </div>
	
			  <ul className="space-y-2">
				<li className="flex flex-col gap-y-4">
				  {navItems.map((item) => (
					<NavLink
					  key={item.path}
					  to={item.path}
					  onClick={toggleSidebar} // Close sidebar on link click
					  className={({ isActive }) =>
						`flex items-center space-x-3 p-3 rounded-lg relative group ${isActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-blue-50'
						} transition-all duration-300`
					  }
					>
					  <div className={`transition-all duration-300`}  style={{ minWidth: '1.5rem' }}>
						{item.icon}
					  </div>
	
					  <span className="transition-opacity duration-300">{item.name}</span>
					  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
						{item.name}
					  </div>
					</NavLink>
				  ))}
				</li>
			  </ul>
			</div>
		  </nav>
		</div>
	  );
	};

export default Sidebar