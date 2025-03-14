import { useState } from "react";
import { FiEdit2 } from "react-icons/fi"; // Pen icon for avatar
import ProfilePic from "../../assets/profileImage.png";
import { getBaseUrl } from "../../services/authService";
import useUserData from "../components/userdata";
import { toast } from "sonner";

const Settings = () => {
  const { userData,user, setUserData } = useUserData();
  const [preview, setPreview] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const baseUrl = getBaseUrl();


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
  
    setPreview(URL.createObjectURL(selectedFile));
  
    const formData = new FormData();
    formData.append("avatar", selectedFile);

    if (!user || !user.id) {
      toast.error("User not found. Please log in again.");
      return;
    }
  
    try {
      if (userData) {
        const uploadUrl = `${baseUrl}/user/update-avatar/${user.id}`;
  
        const response = await fetch(uploadUrl, {
          method: "PUT",
          body: formData,
          credentials: "include",
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Server Error:", errorText);
          return;
        }
  
        const data = await response.json();
  
        if (data.user?.avatar?.url) {
          setUserData((prev: any) => ({ ...prev, avatar: data.user.avatar.url }));
          toast.success("Profile picture updated successfully!");
        } else {
          toast.error("Failed to update profile picture.");
        }
      }
    } catch (error) {
      console.error("Error updating profile picture", error);
      toast.error("An error occurred while updating the profile picture.");
    }
  };
  

  return (
    <div className="p-6 flex flex-col items-center max-w-3xl mx-auto">
      {/* Profile Picture Section */}
      <div className="relative w-32 h-32">
        <img
          src={preview || userData?.avatar?.url || ProfilePic}
          className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 shadow-lg"
          alt="Profile"
        />
        {/* Edit Icon */}
        <label
          htmlFor="profile-upload"
          className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer shadow-md"
        >
          <FiEdit2 className="w-4 h-4" />
        </label>
        <input
          type="file"
          accept="image/*"
          id="profile-upload"
          className="hidden"
          onChange={handleFileChange}
          disabled={loading}
        />
      </div>

      {/* Profile Information Form */}
      <div className="w-full mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "First Name", value: userData?.firstName },
            { label: "Last Name", value: userData?.lastName },
            { label: "Email", value: userData?.email, type: "email" },
            { label: "Registration Number", value: userData?.registration },
            { label: "Course", value: userData?.course },
            { label: "Year", value: userData?.year },
            { label: "Phone Number", value: userData?.phoneNumber, type: "tel" },
          ].map(({ label, value, type = "text" }) => (
            <div key={label}>
              <label className="block text-gray-700 font-semibold">{label}</label>
              <input
                type={type}
                placeholder={value}
                value={value}
                disabled
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
