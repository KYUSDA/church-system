import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { TUser, useGetMembersQuery } from "../../services/userServices";
import { toast } from "sonner";
import { BASE_URL } from "../../services/userServices";

const Users: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<Partial<TUser>>({});
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading,setIsLoading] = useState(false);
  const { data: membersData,refetch } = useGetMembersQuery();

  // Find the user based on ID
  useEffect(() => {
    if (membersData?.users) {
      const foundUser = membersData.users.find((u) => u._id === id);
      setUser(foundUser || null);
      if (foundUser) {
        setInputs(foundUser);
      }
    }
  }, [membersData, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true)
    if (!user) {
      toast.error("Error updating user")
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/user/update-user/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      if (!response.ok) throw new Error("Failed to update user");
      toast.success("User updated successfully!");
      setIsLoading(false);
      refetch(); // Refetch members data after update
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center p-5 min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-5">
        <button onClick={() => navigate(-1)} className="flex items-center text-blue-500 hover:text-blue-700">
          <ArrowBack className="mr-2" /> Back
        </button>
        <h1 className="text-2xl font-bold text-center mt-3">Edit User</h1>

        <form className="mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
              { label: "Email", name: "email" },
              { label: "Course", name: "course" },
              { label: "Year", name: "year" },
              { label: "Registration No", name: "registration" },
            ].map((field) => (
              <div key={field.name} className="w-full">
                <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  value={inputs[field.name] || ""}
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          {/* Assign Family Group */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Assign a Group</label>
            <select
              name="familyLocated"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={inputs.familyLocated || ""}
            >
              <option value="" disabled>Select a group</option>
              <option value="Diaspora A">Diaspora A</option>
              <option value="Elegant">Elegant</option>
              <option value="Diaspora B">Diaspora B</option>
              <option value="Around School A">Around School A</option>
              <option value="Around School B">Around School B</option>
            </select>
          </div>

          {/* Change Role */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Change Role</label>
            <select
              name="role"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={inputs.role || ""}
            >
              <option value="" disabled>Select a role</option>
              <option value="Member">Member</option>
              <option value="admin">Admin</option>
              <option value="Elder">Elder</option>
              <option value="Family Leader">Family Leader</option>
              <option value="Deacon">Deacon</option>
              <option value="Deaconess">Deaconess</option>
            </select>
          </div>

          <button
            onClick={handleClick}
            className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition mt-5"
          >
            {isLoading ? "Updating User" : " Update User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Users;
