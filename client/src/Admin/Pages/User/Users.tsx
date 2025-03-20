import React, { useState } from 'react';
import {
  MailOutline,
  PermIdentity,
  Publish,
} from "@mui/icons-material";
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Users: React.FC = () => {
  const location = useLocation();
  const userId = location.pathname.split('/')[2];
  const user = useSelector((state: any) => state.user.currentUser.find((user: any) => user._id === userId));
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInputs((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const updateUsers = { ...inputs };
    alert('User updated');
    window.location.replace('/');
  };

  return (
    <div className="flex flex-col p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit User</h1>
        <Link to="/newUser">
          <button className="px-4 py-2 bg-teal-500 text-white rounded">Create</button>
        </Link>
      </div>
      <div className="flex mt-5">
        <div className="flex-1 p-5 shadow-md">
          <div className="flex items-center">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div className="mt-5">
            <span className="text-gray-500 font-semibold">Account Details</span>
            <div className="flex items-center mt-5 text-gray-700">
              <PermIdentity className="text-sm" />
              <span className="ml-2">{user?.firstName}</span>
            </div>
            <div className="flex items-center mt-5 text-gray-700">
              <PermIdentity className="text-sm" />
              <span className="ml-2">{user?.lastName}</span>
            </div>
            <div className="flex items-center mt-5 text-gray-700">
              <MailOutline className="text-sm" />
              <span className="ml-2">{user?.email}</span>
            </div>
          </div>
        </div>
        <div className="flex-2 p-5 shadow-md ml-5">
          <span className="text-xl font-semibold">Edit</span>
          <form className="flex justify-between mt-5">
            <div className="flex flex-col space-y-4">
              <div>
                <label className="block text-sm font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder={user?.firstName}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder={user?.lastName}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder={user?.email}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Course</label>
                <input
                  type="text"
                  name="course"
                  placeholder={user?.course}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Year</label>
                <input
                  type="text"
                  name="year"
                  placeholder={user?.year}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Registration No</label>
                <input
                  type="text"
                  name="registration"
                  placeholder={user?.registration}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Assign a Group</label>
                <select
                  name="familyLocated"
                  className="w-full border-b border-gray-300 focus:outline-none"
                  onChange={handleChange}
                >
                  <option defaultValue={'false'} disabled>
                    {user?.role}
                  </option>
                  <option value="Diaspora A">Diaspora A</option>
                  <option value="Diaspora B">Diaspora B</option>
                  <option value="Around School A">Around School A</option>
                  <option value="Around School B">Around School B</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Change Role</label>
                <select
                  name="role"
                  className="w-full border-b border-gray-300 focus:outline-none"
                  onChange={handleChange}
                >
                  <option value="Member">Member</option>
                  <option value="Elder">Elder</option>
                  <option value="Family Leader">Family Leader</option>
                  <option value="Deacon">Deacon</option>
                  <option value="Deaconess">Deaconess</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex items-center">
                <img
                  className="w-24 h-24 rounded-lg object-cover mr-5"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="cursor-pointer" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button
                onClick={handleClick}
                className="px-4 py-2 bg-blue-700 text-white rounded"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Users;
