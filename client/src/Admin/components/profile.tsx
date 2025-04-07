import React from "react";
import { useGetMembersQuery } from "../services/userServices";
import useUserData from "../../Dashboard/components/userdata";

const Profile = () => {
  const { data: members, isLoading, error } = useGetMembersQuery();
  const {user} = useUserData();
  
  if (isLoading) return <div className="text-center text-gray-700">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error loading profile</div>;
  
  const admin = members?.users.find((member) => member.role === "admin");
  
  if (!admin) return <div className="text-center text-gray-500">Admin not found</div>;
  
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
        <img
          src={user?.avatar?.url ?  user?.avatar?.url : "/kyu.jpg"} 
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4 border border-gray-300"
        />
        <h2 className="text-2xl font-bold text-gray-800">{admin.firstName} {admin.lastName}</h2>
        <p className="text-sm text-gray-500">{admin.email}</p>
        <span className="mt-2 inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full">
          {admin.role}
        </span>
      </div>
    </div>
  );
};

export default Profile;
