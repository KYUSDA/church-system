import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { urlFor } from '../../client';

const Breadcrumbs = ({ department }) => (
  <nav className="container mx-auto px-4 py-4 text-gray-600 text-sm">
    <Link to="/" className="hover:underline">Home</Link> /
    <Link to="/departments" className="hover:underline"> Departments</Link> /
    <span className="text-gray-900 font-semibold"> {department?.title}</span>
  </nav>
);

const DepartmentsDetails = () => {
  const location = useLocation();
  const departmentId = location.pathname.split('/')[2];
  const department = useSelector((state) => state?.departments?.departments)?.find((dept) => dept?._id === departmentId);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs department={department} />

      {/* Header Section */}
      <section className="container mx-auto grid md:grid-cols-2 gap-6 px-4 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-blue-600 text-4xl font-bold uppercase">{department?.title}</h2>
          <p className="mt-4 text-gray-600 text-lg leading-relaxed">{department?.description}</p>
        </div>
        <div className="flex justify-center">
          <img src={urlFor(department?.imgUrl)} alt="Department" className="w-full max-w-md rounded-lg shadow-xl" />
        </div>
      </section>

      {/* Leaders Section */}
      {/*
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Leaders</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {department?.leaders?.map((leader, id) => (
              <div key={id} className="bg-white shadow-lg rounded-lg p-6">
                <img src={urlFor(leader?.leaderUrl)} alt="Leader" className="w-32 h-32 mx-auto rounded-full object-cover" />
                <h3 className="text-lg font-semibold mt-4">{leader?.name}</h3>
                <p className="text-gray-600 text-sm">Role: Department Leader</p>
                <p className="mt-2 text-gray-500">{leader?.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Members Section */}
      {/*
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{department?.title} Members</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {department?.members?.map((member, id) => (
              <div key={id} className="bg-gray-50 shadow-md rounded-lg p-6">
                <img src={urlFor(member?.memberUrl)} alt="Member" className="w-24 h-24 mx-auto rounded-full object-cover" />
                <h3 className="text-lg font-semibold mt-4">{member?.name}</h3>
                <p className="text-gray-600 text-sm">Member</p>
                <p className="mt-2 text-gray-500">{member?.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}
    </div>
  );
};

export default DepartmentsDetails;
