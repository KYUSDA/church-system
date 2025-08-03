// ./session/sessionGuard.tsx
import { useDispatch } from "react-redux";
import { useValidateSessionQuery } from "../services/authService";
import { useEffect } from "react";
import { login, logout } from "../session/userSlice";

export const useSessionGuard = () => {
  const { data, error } = useValidateSessionQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error && "status" in error && error.status === 401) {
      dispatch(logout({ reason: "Session expired", showAlert: true }));
    } else if (data?.user) {
      dispatch(login({ user: data.user }));
    }
  }, [data, error, dispatch]);

  return { data, error };
};

const SessionGuard = ({ children }: { children: React.ReactNode }) => {
  useSessionGuard(); // Hook handles session checking + state update
  return <>{children}</>;
};

export default SessionGuard;
