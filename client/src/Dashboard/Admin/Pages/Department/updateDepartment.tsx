import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  TDepartment,
  useGetDepartmentsQuery,
} from "../../../../services/adminService";
import { urlFor } from "../../../../utils/client";
import { toast } from "sonner";
import { getBaseUrl } from "../../../../services/authService";

const ADepartment: React.FC = () => {
  const { id } = useParams(); // Get department ID from URL
  const navigate = useNavigate();
  const { data: departmentsData, refetch } = useGetDepartmentsQuery();
  const [department, setDepartment] = useState<TDepartment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [isDirty, setIsDirty] = useState(false);
  const BASE_URL = getBaseUrl();

  useEffect(() => {
    setIsDirty(JSON.stringify(department) !== JSON.stringify(inputs));
  }, [inputs, department]);

  const handleNavigateBack = () => {
    if (
      isDirty &&
      !window.confirm("You have unsaved changes. Do you want to leave?")
    ) {
      return;
    }
    navigate(-1);
  };

  // Find the department based on ID
  useEffect(() => {
    if (departmentsData) {
      const foundDepartment = departmentsData.find((u) => u._id === id);
      setDepartment(foundDepartment || null);
      if (foundDepartment) {
        setInputs(foundDepartment);
      }
    }
  }, [departmentsData, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!department) {
      toast.error("Error updating department");
      return;
    }
    try {
      const response = await fetch(
        `${BASE_URL}/department/update-department/${department._id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        }
      );

      if (response.status === 403) {
        toast.error("Access Denied [Update department]");
        setIsLoading(false);
        return;
      } else if (!response.ok) {
        toast.error("Failed to update department");
        setIsLoading(false);
        return;
      }
      toast.success("department updated successfully!");
      setIsLoading(false);
      refetch(); // Refetch members data after update
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update department");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      {/* Back Arrow */}
      <div className="w-full max-w-3xl mb-4">
        <button
          onClick={handleNavigateBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-black"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      {/* Department Card */}
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          {department?.title || "Department Details"}
        </h1>

        <div className="flex flex-col items-center">
          <img
            src={
              department?.imgUrl
                ? urlFor(department.imgUrl).url()
                : "/placeholder.jpg"
            }
            alt={department?.title || "Department Image"}
            className="w-32 h-32 rounded-full object-cover border shadow"
          />
          <p className="text-gray-500 mt-2">
            {department?.description || "No description"}
          </p>
        </div>

        {/* Update Form */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Update Department</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">
                Department Name
              </label>
              <input
                type="text"
                name="title"
                value={inputs?.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Description</label>
              <textarea
                name="description"
                value={inputs?.description}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Link</label>
              <input
                type="text"
                name="link"
                value={inputs?.link}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <button
              onClick={handleClick}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {isLoading ? "Updating..." : "Update Department"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ADepartment;
