import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/userLogoutHook";
const SessionExpiryNotifier = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const expiresAt = useSelector((state: any) => state.auth.expiresAt);
  const [isExpired, setIsExpired] = useState(false);
  const {handleLogout} = useLogout();

  useEffect(() => {
    const checkTokenExpiry = () => {
      if (expiresAt && Date.now() >= expiresAt) {
        setIsExpired(true);
        handleLogout()
      }
    };

    const interval = setInterval(checkTokenExpiry, 5000);
    return () => clearInterval(interval);
  }, [expiresAt, dispatch]);

  return (
    isExpired && (
      <div className="fixed top-0 left-0 w-full bg-red-600 text-white text-center p-3 z-50">
        <p>
          Your session has expired.{" "}
          <button
            onClick={() => navigate("/signIn")}
            className="underline"
          >
            Log in again
          </button>
        </p>
      </div>
    )
  );
};

export default SessionExpiryNotifier;
