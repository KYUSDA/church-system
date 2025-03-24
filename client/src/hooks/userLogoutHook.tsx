import { useDispatch } from "react-redux";
import { logout } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getBaseUrl } from "../services/authService";

export const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const baseUrl = getBaseUrl();

    const handleLogout = async () => {
        try {
            await axios.post(`${baseUrl}/member/logout`, {}, { withCredentials: true });

            // Clear Redux state
            dispatch(logout());

            // Redirect to SignIn
            navigate("/signIn");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return { handleLogout };
};
