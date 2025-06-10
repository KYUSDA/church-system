import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import ProfilePic from "../../assets/profileImage.png";
import { getBaseUrl } from "../../services/authService";
import useUserData from "../../session/authData";
import { toast } from "sonner";

const Settings = () => {
  const { userData, setUserData, refetchUser } = useUserData();
  const [preview, setPreview] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const baseUrl = getBaseUrl();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setPreview(URL.createObjectURL(selectedFile));

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    if (!userData || !userData.id) {
      toast.error("User not found. Please log in again.");
      return;
    }

    try {
      if (userData) {
        const uploadUrl = `${baseUrl}/user/update-avatar/${userData.id}`;

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
          await refetchUser(); 
        } else {
          toast.error("Failed to update profile picture.");
        }
      }
    } catch (error) {
      console.error("Error updating profile picture", error);
      toast.error("An error occurred while updating the profile picture.");
    }
  };

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/member/change-password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          oldPassword, 
          newPassword 
        }),
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to update password.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password.");
    } finally {
      setLoading(false);
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

      {/* Profile Information */}
      <div className="w-full mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold">Full Name</label>
            <input
              type="text"
              value={`${userData?.firstName || ""} ${userData?.lastName || ""}`}
              disabled
              className="w-full p-2 border rounded-lg bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              value={userData?.email || ""}
              disabled
              className="w-full p-2 border rounded-lg bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Password Change Section */}
      <div className="w-full mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Change Password</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter old password"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
            />
          </div>
          <button
            onClick={handlePasswordChange}
            className="w-full mt-4 bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
