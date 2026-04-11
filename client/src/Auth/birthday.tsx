import { useEffect, useState } from "react";
import { getBaseUrl } from "@/services/base_query";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useUserData from "@/session/authData";

interface BirthdayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BirthdayModal({ isOpen, onClose }: BirthdayModalProps) {
  const [birthday, setBirthday] = useState("");
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const baseUrl = getBaseUrl();
  const {user} = useUserData();
    const authState = useSelector((state: RootState) => state.auth);
    const token = authState?.user?.data.tokens.accessToken;

  useEffect(() => {
    const timer = setTimeout(() => setShowCloseButton(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  const handleSave = async () => {
    setLoading(true);
    setError("");
  
    try {
      const url = `${baseUrl}/profile/update/${user?.userId}`;
    
      const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ 
        birthday,
        userId: user?.userId 
      }),
      });
    
      if (!response.ok) {
        throw new Error("Failed to update birthday");
      }
  
      toast.success("Updated birthday successfully 🎉");
      onClose(); // Close modal after successful save
    } catch (err) {
      setError("Failed to update birthday. Please try again.");
      toast.error("Failed to update birthday. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-lg relative border-2 border-gray-200">
        {/* Close "X" button (Appears after 5 seconds) */}
        {showCloseButton && (
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-300 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            onClick={onClose}
            disabled={loading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Modal Content */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          🎉 We Celebrate Birthdays! 🎉
        </h2>
        <p className="mt-4 text-gray-600 text-center">
          As a church, we love celebrating birthdays 🎂. Please enter your birth
          date so we can send you warm wishes on your special day. We will mark
          the date to remind you and celebrate with you! 🎈
        </p>
        <input
          type="date"
          className="mt-6 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          disabled={loading}
        />
        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}
        <div className="mt-6 flex justify-center">
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-blue-300"
            onClick={handleSave}
            disabled={!birthday || loading}
          >
            {loading ? "Saving..." : "Save 🎂"}
          </button>
        </div>
      </div>
    </div>
  );
}
