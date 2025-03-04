import React, { useState, useEffect } from "react";
import { NavLink} from "react-router-dom";
import { useAuthContext } from "../../context/useAuthcontext";
import { X } from "lucide-react";

const Sidebar = ({isOpen,toggleSidebar}) => {
	const { user } = useAuthContext();
	const [userData, setUserData] = useState();

	useEffect(() => {
		const getData = async () => {
			if (!user || !user.id) return;
			const url = `https://kyusdabackend-ghbbf8a8fvete4ax.southafricanorth-01.azurewebsites.net/kyusda/v1/user/${user.id}`;
			const resp = await fetch(url);
			const data = await resp.json();
			setUserData(data);
		};
		getData();
	}, [user]);

	const navItems = [
		{ path: "/member/dashboard", name: "Dashboard", icon: "M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3M11 3H3v10h8V3m10 8h-8v10h8V11m-10 4H3v6h8v-6z" },
		{ path: "/member/resources", name: "Resources", icon: "M4 4v18h16V4H4zm14 16H6V6h12v14zm-3-7H9v-2h6v2zm0-4H9V7h6v2zm-6 8h6v-2H9v2z" },
		{ path: "/member/defend-your-faith", name: "Defend Your Faith", icon: "M19 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 18H6V4h13v16m-7-9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m4 3c0-1.3-2.7-2-4-2s-4 .7-4 2v1h8v-1m-3.5 4h-1v-1h1v1m-1-2v-1h1v1h-1z" },
		{ path: "/member/bibleTrivia", name: "Bible Trivia", icon: "M5.81 2H17c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m0 2v16h11.17L17 19.83V4H5.81M7 6h9v2H7V6m0 4h9v2H7v-2m0 4h5v2H7v-2z" },
		{ path: "/member/family", name: "Family", icon: "M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9 3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3 3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3 3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62.86-1.11 1.28-2.53 1.13-3.96C17.92 8.15 18.44 8 19 8M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13v-1.75M0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9-.59.68-.95 1.62-.95 2.65V20H0m24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65 2.56.34 4.45 1.51 4.45 2.9V20z" },
		{ path: "/member/settings", name: "Settings", icon: "M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.65.07.97l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65z" }
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
				  src="https://i.pinimg.com/originals/68/e1/e1/68e1e137959d363f172dc3cc50904669.jpg"
				  alt="Profile"
				  className="h-12 w-12 rounded-full object-cover"
				/>
				<div>
				  <h3 className="font-semibold truncate overflow-hidden whitespace-nowrap max-w-[10rem]">{user?.email}</h3>
				  <p className="text-sm text-gray-500">{userData?.role}</p>
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
					  <svg className={`h-6 w-6 transition-all duration-300`} viewBox="0 0 24 24" fill="currentColor" style={{ minWidth: '1.5rem' }}>
						<path d={item.icon} />
					  </svg>
	
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