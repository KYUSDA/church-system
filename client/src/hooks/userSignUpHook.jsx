import { useState } from "react";
import { redirect } from "react-router-dom";
import { useAuthContext } from "../context/useAuthcontext";
import { getBaseUrl } from "../utils/api";
export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();
    const baseUrl = getBaseUrl();

  const clearError = () => {
    setError(null);
  }
  const signUp = async (
    firstName,
    lastName,
    registration,
    email,
    course,
    year,
    password,
    passwordConfirm,
    phoneNumber
  ) => {
    setError(null);
    setLoading(true);
    const url = `${baseUrl}member/signUp`;
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        registration,
        email,
        course,
        year,
        password,
        passwordConfirm,
        phoneNumber
      }),
    });
    const data = await resp.json();
    console.log(data);
    if (!resp.ok) {
      setError(data.error);
      setLoading(false);
    }
    if (resp.ok) {
      //set the token and user on frontend
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      setLoading(false);
      redirect("/signIn");
    }
  };

  return { signUp, loading, error, clearError };
};
