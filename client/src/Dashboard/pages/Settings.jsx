import { useAuthContext } from "../../context/useAuthcontext";
import { useState, useEffect } from "react";
import { FiEdit2 } from "react-icons/fi"; // Pen icon for avatar
import ProfilePic from "../../assets/profileImage.png";

const Settings = () => {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    const getData = async () => {
      if (!user) return;
      const url = `https://kyusdabackend-ghbbf8a8fvete4ax.southafricanorth-01.azurewebsites.net/kyusda/v1/user/${user.id}`;
      const resp = await fetch(url);
      const data = await resp.json();
      setUserData(data);
    };
    getData();
  }, [user]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
        <label htmlFor="profile-upload" className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer shadow-md">
          <FiEdit2 className="w-4 h-4" />
        </label>
        <input type="file" accept="image/*" id="profile-upload" className="hidden" onChange={handleFileChange} />
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
                defaultValue={value}
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
