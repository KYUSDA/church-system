import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLogout } from "../hooks/userLogoutHook";

const SessionExpiryNotifier = () => {
  const expiresAt = useSelector((state: any) => state.auth.expiresAt);
  const [isExpired, setIsExpired] = useState(false);
  const { handleLogout } = useLogout();

  useEffect(() => {
    const checkTokenExpiry = () => {
      if (!expiresAt) return;

      const timeLeft = expiresAt - Date.now();

      if (timeLeft <= 0) {
        setIsExpired(true);

        // Delay slightly to show message before reload
        setTimeout(async () => {
          await handleLogout();
          window.location.reload(); // Reload after logout
        }, 4000);
      }
    };

    const interval = setInterval(checkTokenExpiry, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [expiresAt, handleLogout]);

  return (
    isExpired && (
      <div className="fixed top-0 left-0 w-full bg-red-600 text-white text-center p-3 z-50">
        <p>Your session has expired. Reloading...</p>
      </div>
    )
  );
};

export default SessionExpiryNotifier;
