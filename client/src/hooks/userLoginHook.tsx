import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/userSlice";
import { useAuthLoginMutation } from "../services/authService";
import { toast } from "sonner";

interface FormData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authLogin,{isLoading}] = useAuthLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = async (values: FormData) => {
    setError(null);
    setLoading(true);

    try {
      const resp = await authLogin(values).unwrap(); // ✅ Unwrap to handle errors

      if (resp) {
        const { user, accessToken } = resp;

        // ✅ Store user data in Redux
        dispatch(
          login({
            user,
            accessToken,
            expiresIn: 3600, 
          })
        );

        toast.success("Login successful");

        // ✅ Redirect based on role
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/member/dashboard");
        }
      }
    } catch (err: any) {
      setError(err?.data?.message || "Login failed");
      toast.error(err?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error,isLoading };
};
