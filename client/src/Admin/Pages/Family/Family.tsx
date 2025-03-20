import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const AFamily: React.FC = () => {
  const location = useLocation();
  const familyId = location.pathname.split('/')[2];
  const dispatch = useDispatch();
  const family = useSelector((state: any) =>
    state.family.families.find((family: any) => family._id === familyId)
  );

  const [inputs, setInputs] = useState<Record<string, any>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const updatedFamily = { ...inputs };
    // updateFamily(familyId, updatedFamily, dispatch);
    alert('Family updated');
    window.location.replace('/');
  };

  return (
    <div className="flex flex-col p-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Department</h1>
        <Link to="/newFamily">
          <button className="px-4 py-2 bg-teal-500 text-white rounded-md">Create</button>
        </Link>
      </div>
      <div className="flex">
        <div className="flex-1 p-5 shadow-md">
          <div className="mb-4">
            <div className="flex justify-between">
              <span className="font-semibold">ID:</span>
              <span>{family?._id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Department Name:</span>
              <span>{family?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Elder in Charge:</span>
              <span>{family?.elder}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Head:</span>
              <span>{family?.head}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Location:</span>
              <span>{family?.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Bio:</span>
              <span>{family?.bio}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 shadow-md mt-5">
        <form className="flex justify-between">
          <div className="flex flex-col space-y-4">
            <label>
              Family Name
              <input
                type="text"
                name="name"
                placeholder={family?.name}
                onChange={handleChange}
                className="border-b border-gray-400 p-2"
              />
            </label>
            <label>
              Elder In Charge
              <input
                type="number"
                name="elder"
                placeholder={family?.elder}
                onChange={handleChange}
                className="border-b border-gray-400 p-2"
              />
            </label>
            <label>
              Head
              <input
                type="text"
                name="head"
                placeholder={family?.head}
                onChange={handleChange}
                className="border-b border-gray-400 p-2"
              />
            </label>
            <label>
              Location
              <input
                type="text"
                name="location"
                placeholder={family?.location}
                onChange={handleChange}
                className="border-b border-gray-400 p-2"
              />
            </label>
            <label>
              Bio
              <input
                type="text"
                name="bio"
                placeholder={family?.bio}
                onChange={handleChange}
                className="border-b border-gray-400 p-2"
              />
            </label>
          </div>
          <div className="flex flex-col justify-between">
            <button
              onClick={handleClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AFamily;
