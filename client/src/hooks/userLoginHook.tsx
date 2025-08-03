import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../session/userSlice";
import { useAuthLoginMutation } from "../services/authService";
import { toast } from "sonner";
import { getRedirectPath } from "../utils/redirect";

interface FormData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authLogin, { isLoading }] = useAuthLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = async (values: FormData) => {
    setError(null);
    setLoading(true);

    try {
      const resp = await authLogin(values).unwrap();

      if (resp) {
        const { data } = resp;

        dispatch(
          login({
            user: {
              data: {
                tokens: data.tokens,
                user: {
                  userId: data.user.userId,
                  role: data.user.role,
                },
              },
            },
          })
        );

        toast.success("Login successful");
        navigate(getRedirectPath(data.user.role));
      }
    } catch (err: any) {
      const message = err?.data?.message || "Login failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error, isLoading };
};
