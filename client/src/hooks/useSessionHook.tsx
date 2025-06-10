
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateAccessTokenMutation } from "../services/authService";
import { logout, updateAuthToken } from "../session/userSlice";
import { RootState } from "../store/store";

export const useSessionGuard = () => {
  const router = useNavigate();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const [refreshToken] = useUpdateAccessTokenMutation();
  const session = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!session?.expiresAt) return;

      const isExpired =
        new Date().getTime() > new Date(session.expiresAt).getTime();
      if (!isExpired) return;

      try {
        const res = await refreshToken().unwrap();
        const newExpiry = new Date().getTime() + 60 * 60 * 1000; // 1 hour
        dispatch(
          updateAuthToken({
            accessToken: res.accessToken,
            expiresAt: newExpiry,
          })
        );
      } catch (error) {
        dispatch(logout());
        setShowAlert(true);
        router("/signIn", { replace: true });
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [session, refreshToken, dispatch, router]);
  

  return showAlert;
};
