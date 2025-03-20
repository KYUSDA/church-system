import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const Newuser: React.FC = () => {
  const [inputs, setInputs] = useState<Record<string, string | number>>({});
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(inputs);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const claim = { ...inputs };
    console.log(claim);
    alert('User created');
    window.location.replace('/');
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">New Church Member</h1>
      <form className="w-full max-w-lg space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">First Name</label>
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Last Name</label>
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Registration</label>
          <input
            name="registration"
            type="text"
            placeholder="Registration No"
            className="border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Course</label>
          <input
            name="course"
            type="text"
            placeholder="Course"
            className="border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Year</label>
          <input
            name="year"
            type="number"
            placeholder="Year"
            className="border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Password Confirm</label>
          <input
            name="passwordConfirm"
            type="password"
            placeholder="Password Confirm"
            className="border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Assign a Group</label>
          <select
            name="group"
            className="border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          >
            <option value="not yet assigned">Not Assigned</option>
            <option value="Diaspora A">Diaspora A</option>
            <option value="Diaspora B">Diaspora B</option>
            <option value="Around School A">Around School A</option>
            <option value="Around School B">Around School B</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Change Role</label>
          <select
            name="role"
            className="border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          >
            <option value="Member">Member</option>
            <option value="Elder">Elder</option>
            <option value="Department Head">Department Head</option>
            <option value="Family Leader">Family Leader</option>
            <option value="Deacon">Deacon</option>
            <option value="Deaconess">Deaconess</option>
          </select>
        </div>
        <button
          onClick={handleClick}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Newuser;
