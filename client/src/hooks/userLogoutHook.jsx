import { useAuthContext } from "../context/useAuthcontext"
import { useNavigate } from "react-router-dom";
export const useLogout = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");
    dispatch({ type: 'LOGOUT' })
    navigate("/signIn", { replace: true });
    // dispatch logout action
  };

  return { logout };
};
