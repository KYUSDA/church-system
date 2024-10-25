import { useState } from "react";
import { redirect } from "react-router-dom";
import { useAuthContext } from "../context/useAuthcontext";
export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const signUp = async (
    firstName,
    lastName,
    registration,
    email,
    course,
    year,
    password,
    passwordConfirm
  ) => {
    setError(null);
    setLoading(true);
    const url = `https://kyusdabackend.azurewebsites.net/kyusda/v1/member/signUp`;
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
      }),
    });
    const data = await resp.json();
    console.log(data);
    if (!resp.ok) {
      console.log(data.error);
      setError(data.err);
      setLoading(false);
    }
    if (resp.ok) {
      //set the token and useron frontend
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      setLoading(false);
      redirect("/signIn");
    }
  };

  return { signUp, loading, error };
};
