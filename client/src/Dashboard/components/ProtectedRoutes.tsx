import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const ProtectedRoute = ({ children }:{children: React.ReactNode}) => {
  const user = useSelector((state:RootState) => state.auth.user);

  if (!user) {
    return <Navigate to="/signIn" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
