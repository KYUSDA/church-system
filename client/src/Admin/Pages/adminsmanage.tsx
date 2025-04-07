import React, { useState } from "react";
import { useGetMembersQuery } from "../services/userServices";

const AdminsManage = () => {
  const { data: members, isLoading, error } = useGetMembersQuery();
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [newRole, setNewRole] = useState("");

  if (isLoading) return <div className="text-center text-gray-700">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error loading members</div>;

  const admins = members?.users.filter((member) => member.role === "admin");

  interface Admin {
    _id: string;
    firstName: string;
    email: string;
    role: string;
  }

  const handleEditRole = (admin: Admin) => {
    setSelectedAdmin(admin);
    setNewRole(admin.role);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Admins</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {admins?.map((admin) => (
          <div key={admin._id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <p className="text-lg font-semibold text-gray-700">{admin.firstName}</p>
            <p className="text-sm text-gray-500">{admin.email}</p>
            <p className="text-sm text-gray-600 font-medium">Role: {admin.role}</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handleEditRole(admin)}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Edit Role
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedAdmin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Edit Role for {selectedAdmin.firstName}</h2>
            <label className="block text-gray-700 font-medium mb-2">Select Role</label>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>
            <button
              onClick={() => setSelectedAdmin(null)}
              className="mt-4 w-full bg-gray-300 hover:bg-gray-400 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminsManage;