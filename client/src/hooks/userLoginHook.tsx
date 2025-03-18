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
  const [authLogin] = useAuthLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = async (values: FormData) => {
    setError(null);
    setLoading(true);

    try {
      const resp = await authLogin(values).unwrap(); // ✅ Use unwrap() to handle errors

      if (resp) {
        // ✅ Extract user and token from response
        const { user, accessToken } = resp;

        // ✅ Dispatch to Redux store
        dispatch(
          login({
            user,
            accessToken,
          })
        );
        toast.success("Login successful");
        navigate("/member/dashboard");
      }
    } catch (err: any) {
      setError(err?.data?.message || "Login failed");
      toast.error(err?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error };
};
