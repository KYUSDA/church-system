import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/userLogoutHook";
import axios from "axios";
import { updateAuthToken } from "../../store/slices/userSlice";
import { BASE_URL } from "../../Admin/services/userServices";

const SessionExpiryNotifier = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const expiresAt = useSelector((state: any) => state.auth.expiresAt);
  const [isExpired, setIsExpired] = useState(false);
  const { handleLogout } = useLogout();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/member/update-accesstoken`,
          {},
          { withCredentials: true }
        );
        const { accessToken } = response.data;
        const newExpiresAt = Date.now() + 60 * 60 * 1000; // 60 minutes from now
        dispatch(updateAuthToken({ accessToken, expiresAt: newExpiresAt })); // Update Redux state
        setIsExpired(false); // Reset expiration flag
      } catch (error) {
        console.error("Failed to refresh token:", error);
        setIsExpired(true); // If refresh fails, mark as expired
        handleLogout(); // Log out if refresh fails
      }
    };

    const checkTokenExpiry = () => {
      if (!expiresAt) return; // No token to check
      const expiresAtTime = typeof expiresAt === "string" ? Number(expiresAt) : expiresAt; // Ensure expiresAt is a number
      const timeLeft = expiresAtTime - Date.now();
      if (timeLeft <= 0) {
        // Token has expired
        setIsExpired(true);
        handleLogout();
      } else if (timeLeft <= 5 * 60 * 1000) {
        // Less than 5 minutes left, attempt to refresh
        refreshToken();
      }
    };

    const interval = setInterval(checkTokenExpiry, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [expiresAt, dispatch, handleLogout]);

  return (
    isExpired && (
      <div className="fixed top-0 left-0 w-full bg-red-600 text-white text-center p-3 z-50">
        <p>
          Your session has expired.{" "}
          <button onClick={() => navigate("/signIn")} className="underline">
            Log in again
          </button>
        </p>
      </div>
    )
  );
};

export default SessionExpiryNotifier;
