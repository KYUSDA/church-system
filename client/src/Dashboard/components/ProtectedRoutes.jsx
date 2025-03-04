import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthcontext";


const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext(); // user from context

  if (!user) {
    return <Navigate to="/signIn" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
