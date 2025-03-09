import { useAuthContext } from "../../context/useAuthcontext";
import { useState, useEffect } from "react";
import { FiEdit2 } from "react-icons/fi"; // Pen icon for avatar
import ProfilePic from "../../assets/profileImage.png";
import { getBaseUrl } from "../../utils/api";

const Settings = () => {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState();
  const [file, setFile] = useState();
  const baseUrl = getBaseUrl();

  useEffect(() => {
    const getData = async () => {
      if (!user) return;
      const url = `${baseUrl}/user/${user.id}`;
      const resp = await fetch(url);
      const data = await resp.json();
      setUserData(data);
    };
    getData();
  }, [user, baseUrl]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Set the selected file in state
    setFile(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Assuming the backend is configured to handle image uploads directly
      const uploadUrl = `${baseUrl}/user/${user.id}`;
      const updateData = { ...userData, profilePic: "" }; // Remove previous image URL (if any)

      // Upload the file and get the image URL
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData), // Update user data without image first
      });

      if (uploadResponse.ok) {
        // Now, update the profile with the image URL (backend should return the image URL)
        const formData = new FormData();
        formData.append("file", selectedFile);

        const imageUploadResponse = await fetch(uploadUrl, {
          method: "POST",
          body: formData,
        });
        
        const imageData = await imageUploadResponse.json();
        if (imageData.success) {
          // Update the profile with the new image URL
          const updatedUserData = { ...userData, profilePic: imageData.imageUrl };
          await fetch(uploadUrl, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUserData),
          });

          // Update state with the new image URL
          setUserData(updatedUserData);
        }
      }
    } catch (error) {
      console.error("Error updating profile picture", error);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center max-w-3xl mx-auto">
      {/* Profile Picture Section */}
      <div className="relative w-32 h-32">
        <img
          src={userData?.profilePic || ProfilePic}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 shadow-lg"
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
