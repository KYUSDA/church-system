import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TUser } from "./authData";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
const authState = useSelector((state: RootState) => state.auth);
  const user = authState.user as TUser | null;

  if (!user || !user.id) {
    return <Navigate to="/signIn" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
