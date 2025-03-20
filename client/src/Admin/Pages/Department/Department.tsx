import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


const ADepartment: React.FC = () => {
  const location = useLocation();
  const departmentId = location.pathname.split('/')[2];
  const dispatch = useDispatch();
  const department = useSelector((state: any) =>
    state.department.departments.find((department: any) => department._id === departmentId)
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
    const updatedDepartment = { ...inputs };
    alert('Department updated');
    window.location.replace('/');
  };

  return (
    <div className="flex flex-col p-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Department</h1>
        <Link to="/newDepart">
          <button className="px-4 py-2 bg-teal-500 text-white rounded">Create</button>
        </Link>
      </div>
      <div className="flex mb-5">
        <div className="flex-1 p-5 shadow-md">
          <div className="mb-5">
            <span className="text-lg font-semibold">{department?.submittedBy}</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">ID:</span>
              <span>{department?._id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Department Name:</span>
              <span>{department?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Elder in Charge:</span>
              <span>{department?.elder}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Head:</span>
              <span>{department?.head}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Event:</span>
              <span>{department?.event}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Project:</span>
              <span>{department?.project}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 shadow-md">
        <form className="flex justify-between">
          <div className="flex flex-col space-y-3">
            <label className="text-gray-600">Department Name</label>
            <input
              type="text"
              name="name"
              placeholder={department?.name}
              onChange={handleChange}
              className="border-b border-gray-400 p-2"
            />
            <label className="text-gray-600">Elder In Charge</label>
            <input
              type="number"
              name="elder"
              placeholder={department?.elder}
              onChange={handleChange}
              className="border-b border-gray-400 p-2"
            />
            <label className="text-gray-600">Head</label>
            <input
              type="text"
              name="head"
              placeholder={department?.head}
              onChange={handleChange}
              className="border-b border-gray-400 p-2"
            />
            <label className="text-gray-600">Upcoming Event</label>
            <input
              type="text"
              name="event"
              placeholder={department?.event}
              onChange={handleChange}
              className="border-b border-gray-400 p-2"
            />
            <label className="text-gray-600">Project</label>
            <input
              type="text"
              name="project"
              placeholder={department?.project}
              onChange={handleChange}
              className="border-b border-gray-400 p-2"
            />
          </div>
          <div className="flex flex-col justify-between">
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
  );
};

export default ADepartment;
