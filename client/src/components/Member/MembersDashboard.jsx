import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useAuthContext } from '../../context/useAuthcontext';

const MembersDashboard = () => {
	const {dispatch,user} = useAuthContext();
	const [userData,setUserData] = useState();
	console.log(user.email,user.id);
useEffect(()=>{
const getData  = async()=>{
const url = `http://localhost:8000/kyusda/v1/user/${user.id}`
const resp = await fetch(url);
const data = await resp.json();
setUserData(data)
console.log(data);
}
getData();
},[]);
console.log(userData);
  return (
    <div className='h-screen w-full flex overflow-hidden select-none'>
<nav className='w-24 flex flex-col items-center bg-white dark:bg-gray-800 py-4'>
<div>
	<Link to='/'>
  <svg className='h-8 w-8 fill-current text-blue-600 dark:text-blue-300'
  viewBox="0 0 24 24"
  >
	<path
		d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3m6.82
		6L12 12.72 5.18 9 12 5.28 18.82 9M17 16l-5 2.72L7 16v-3.73L12
		15l5-2.73V16z"></path>
  </svg>
	</Link>
</div>
<ul className='mt-2 text-gray-700 dark:text-gray-400 capitalize'>
<li className='mt-3 p-2 text-blue-600 dark:text-blue-300 rounded-lg'>
<Link to=''>
<svg class="fill-current h-5 w-5" viewBox="0 0 24 24">
						<path
							d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9
							17v2H5v-2h4M21 3h-8v6h8V3M11 3H3v10h8V3m10
							8h-8v10h8V11m-10 4H3v6h8v-6z"></path>
					</svg>
					<span class="text-xs mt-2">dashBoard</span>
</Link>
</li>
<li
				className="mt-3 p-2 hover:text-blue-600 dark-hover:text-blue-300
				rounded-lg">

			</li>
</ul>
<div
			className="mt-auto flex items-center p-2 text-blue-700 bg-purple-200
			dark:text-blue-500 rounded-full">

			<Link to="#">
				<svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
					<path
						d="M12 1c-5 0-9 4-9 9v7a3 3 0 003 3h3v-8H5v-2a7 7 0 017-7
						7 7 0 017 7v2h-4v8h4v1h-7v2h6a3 3 0
						003-3V10c0-5-4.03-9-9-9z"></path>
				</svg>
			</Link>
		</div>
</nav>

<main className='my-1 pt-2 pb-2 px-10 flex-1 bg-gray-200 dark:bg-black rounded-l-lg
		transition duration-500 ease-in-out overflow-y-auto'>
<div className='flex flex-col capitalize text-3xl'>
<span className='font-semibold'>Welcome Back
</span>
<span>{user?.email}</span>
</div>
<div className='flex'>
<div
	className="mr-6 w-1/2 mt-8 py-2 flex-shrink-0 flex flex-col bg-white dark:bg-gray-600 rounded-lg">
    				<h3
					class="flex items-center pt-1 pb-1 px-8 text-lg font-semibold
					capitalize dark:text-gray-300">
					<span>Devotions</span>
					<button class="ml-2">
						<svg class="h-5 w-5 fill-current" viewBox="0 0 256 512">
							<path
								d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9
								0l-22.6-22.6c-9.4-9.4-9.4-24.6
								0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6
								0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136
								136c9.5 9.4 9.5 24.6.1 34z"></path>
						</svg>
					</button>
				</h3>
        <div>
          <ul className='pt-1 pb-2 px-3 overflow-y-auto'>
<li className='mt-2'>
<Link to='#' className="p-5 flex flex-col justify-between bg-gray-100 dark:bg-gray-200 rounded-lg">
<div className='flex items-center justify-between font-semibold capitalize dark:text-gray-700'>
<span>Morning Devotion</span>
<div className="flex items-center">					
</div>
</div>
<p
									class="text-sm font-medium leading-snug
									text-gray-600 my-3">
									Lorem ipsum, dolor sit amet consectetur
									adipisicing elit. Explicabo assumenda porro
									sapiente, cum nobis tempore delectus
									consectetur ullam reprehenderit quis ducimus,
									iusto dolor nam corporis id perspiciatis
									consequuntur saepe excepturi.
								</p>
                <div className="flex justify-between">
<div className='flex'>
Posted By: 
	<span>
	<span
		className="text-blue-500 font-semibold">
	John
	</span>
	</span>
</div>
<p
	class="text-sm font-medium leading-snug text-gray-600">
	3 hours ago
									</p>
                </div>
</Link>
</li>
<li className='mt-2'>
<Link to='#' className="p-5 flex flex-col justify-between bg-gray-100 dark:bg-gray-200 rounded-lg">
<div className='flex items-center justify-between font-semibold capitalize dark:text-gray-700'>
<span>Lesson Discussion</span>
<div className="flex items-center">
										<svg
											class="h-5 w-5 fill-current mr-1
											text-gray-600"
											viewBox="0 0 24 24">
											<path
												d="M14 12l-4-4v3H2v2h8v3m12-4a10
												10 0 01-19.54 3h2.13a8 8 0
												100-6H2.46A10 10 0 0122 12z"></path>
										</svg>
</div>
</div>
<p
									class="text-sm font-medium leading-snug
									text-gray-600 my-3">
									Lorem ipsum, dolor sit amet consectetur
									adipisicing elit. Explicabo assumenda porro
									sapiente, cum nobis tempore delectus
									consectetur ullam reprehenderit quis ducimus,
									iusto dolor nam corporis id perspiciatis
									consequuntur saepe excepturi.
</p>
                <div className="flex justify-between">
<div className='flex'>
	Posted By:
	<span>
	<span
		className="text-blue-500 font-semibold">
	 Sam
	</span>
	</span>
</div>
<p
	class="text-sm font-medium leading-snug text-gray-600">
	1 hour ago
</p>
 </div>
</Link>
</li>
</ul>

<Link
to="#"
class="flex justify-center capitalize text-blue-500
dark:text-blue-200">
<span>see all</span>
</Link>
</div>
</div>
<div className='mr-6 w-1/2 mt-8 py-2 flex-shrink-0 flex flex-col bg-purple-300 rounded-lg text-white'>
<h3 className='flex items-center pt-1 pb-1 px-8 text-lg font-bold capitalize'>
<button className="ml-2">
						<svg className="h-5 w-5 fill-current" viewBox="0 0 256 512">
							<path
								d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9
								0l-22.6-22.6c-9.4-9.4-9.4-24.6
								0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6
								0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136
								136c9.5 9.4 9.5 24.6.1 34z"></path>
						</svg>
					</button>
</h3>
<div className='flex flex-col items-center mt-12'>
<img
src="https://cdni.iconscout.com/illustration/premium/thumb/empty-state-2130362-1800926.png"
alt=" empty schedule" />
	<span class="font-bold mt-8">Family Group Allocated</span>
	<span>{userData?.familyLocated}</span>
  <span class="text-purple-500">
	</span>
  <button class="mt-8 bg-purple-800 rounded-lg py-2 px-4">
	<Link to={`/${userData?.familyLocated}`}>
	Check it Out
	</Link>
						
		</button>
</div>
</div>
</div>
</main>
<aside className="w-1/4 my-1 mr-1 px-6 py-4 flex flex-col bg-gray-200 dark:bg-black dark:text-gray-400 rounded-r-lg overflow-y-auto">
<div className='flex items-center justify-between'>
<Link to='' className='relative'>
<span>
  <svg className='h-5 w-5 hover:text-red-600 dark-hover:text-red-400'
  iewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  >
<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
<path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
</span>
<div class="absolute w-2 h-2 left-0 mb-6 ml-2 bottom-0">
					<span
						class="px-2 py-1 bg-red-600 rounded-full text-white
						text-xs">
						Settings
					</span>
	</div>
</Link>
<div className='flex items-center'>
<img
					className="h-10 w-10 rounded-full object-cover"
					src="https://i.pinimg.com/originals/68/e1/e1/68e1e137959d363f172dc3cc50904669.jpg"
					alt="tempest profile" />
	<button class="ml-1 focus:outline-none">

<svg className="h-4 w-4 fill-current" viewBox="0 0 192 512">
  <path
    d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72
    72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72
    72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0
    352c0 39.8 32.2 72 72 72s72-32.2
    72-72-32.2-72-72-72-72 32.2-72 72z"></path>
</svg>
</button>
</div>
</div>
<span className="mt-4 text-gray-600">Church Role</span>
<span className="mt-1 text-3xl font-semibold">{userData?.role}</span>
<div class="mt-12 flex items-center">
			<span>Upcomming Events</span>
			<button class="ml-2 focus:outline-none">
				<svg class="h-5 w-5 fill-current" viewBox="0 0 256 512">
					<path
						d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9
						0l-22.6-22.6c-9.4-9.4-9.4-24.6
						0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3
						103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1
						34z"></path>
				</svg>
			</button>
	</div>

  <Link to='/' className='mt-8 p-4 flex justify-between bg-gray-300 rounded-lg
			font-semibold capitalize'>
  <div className='flex'>
<img  className='h-10 w-10 rounded-full object-cover' src="https://lh3.googleusercontent.com/cX0xwvJKCNIFrl2wIwoYiIURxmZt1y7tF3wJvynqcnQG5tmYdKBLpDDvhXzmVZzrstAEkw=s151"
	alt="veldora profile" />
<div class="flex flex-col ml-4">
<span>Finalist Sabbath</span>
<span className="text-sm text-gray-600">25/04/2023</span>
</div>
  </div>
  </Link>

  <Link to='/' className='mt-8 p-4 flex justify-between bg-gray-300 rounded-lg
			font-semibold capitalize'>
  <div className='flex'>
<img  className='h-10 w-10 rounded-full object-cover' src="https://lh3.googleusercontent.com/cX0xwvJKCNIFrl2wIwoYiIURxmZt1y7tF3wJvynqcnQG5tmYdKBLpDDvhXzmVZzrstAEkw=s151"
	alt="veldora profile" />
<div class="flex flex-col ml-4">
<span>Grand Contribution</span>
<span className="text-sm text-gray-600">03/11/2023</span>
</div>
  </div>
  </Link>
  <div class="mt-4 flex justify-center capitalize text-blue-600">
			<Link to="#">see all</Link>
		</div>
</aside>
    </div>
  )
}

export default MembersDashboard