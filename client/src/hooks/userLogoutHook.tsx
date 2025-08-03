import { useDispatch } from "react-redux";
import { logout } from "../session/userSlice";
import { useNavigate } from "react-router-dom";
import { getBaseUrl } from "../services/authService";
import { store } from "../store/store"; 

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseUrl = getBaseUrl();

  const handleLogout = async () => {
    try {
      await fetch(`${baseUrl}/member/logout`,{credentials: 'include'});
      localStorage.setItem("birthdayModalSeen", "false"); // Reset birthday modal
      // Clear Redux state
      dispatch(logout({}));

      // Redirect to SignIn
      navigate("/signIn");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return { handleLogout };
};


// logoutHelper.ts
export const logoutCompletely = async () => {
  const baseUrl = getBaseUrl();
  try {
    await fetch(`${baseUrl}/member/logout`, { credentials: "include" });
    localStorage.setItem("birthdayModalSeen", "false");

    store.dispatch(logout({ reason: "Session expired", showAlert: true }));
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
