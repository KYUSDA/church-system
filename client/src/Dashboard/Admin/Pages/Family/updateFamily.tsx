import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  TFamily,
  useGetFamiliesQuery,
} from "../../../../services/adminService";
import { toast } from "sonner";
import { getBaseUrl } from "@/services/base_query";

const AFamily: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: familiesData, refetch } = useGetFamiliesQuery();
  const [family, setFamily] = useState<TFamily | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [isDirty, setIsDirty] = useState(false);
  const BASE_URL = getBaseUrl();

  useEffect(() => {
    setIsDirty(JSON.stringify(family) !== JSON.stringify(inputs));
  }, [inputs, family]);

  useEffect(() => {
    if (familiesData) {
      const foundFamily = familiesData.find((f) => f._id === id);
      setFamily(foundFamily || null);
      if (foundFamily) {
        setInputs(foundFamily);
      }
    }
  }, [familiesData, id]);

  const handleNavigateBack = () => {
    if (
      isDirty &&
      !window.confirm("You have unsaved changes. Do you want to leave?")
    ) {
      return;
    }
    navigate(-1);
  };

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
    if (!family) {
      toast.error("Error updating family");
      return;
    }
    try {
      const response = await fetch(
        `${BASE_URL}/family/update-family/${family._id}`,
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
        toast.error("Access Denied [Update family]");
        setIsLoading(false);
        return;
      } else if (!response.ok) {
        toast.error("Failed to update family");
        setIsLoading(false);
        return;
      }
      toast.success("Family updated successfully!");
      setIsLoading(false);
      refetch();
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update family");
    } finally {
      setIsLoading(false);
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

      {/* Family Card */}
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          {family?.title || "Family Details"}
        </h1>

        <div className="flex flex-col items-center">
          <img
            src={family?.imgUrl ? family?.imgUrl : "/kyu.jpg"}
            alt={family?.title || "Family Image"}
            className="w-32 h-32 rounded-md object-cover border shadow"
          />

          <p className="text-gray-500 mt-2">
            {family?.description || "No description"}
          </p>
        </div>

        {/* Update Form */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Update Family</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">Family Name</label>
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

            {/* tags */}
            <div>
              <label className="block text-gray-600 mb-1">Tags</label>
              <input
                type="text"
                name="tags"
                value={inputs?.tags?.join(", ")}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <button
              onClick={handleClick}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {isLoading ? "Updating..." : "Update Family"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AFamily;
