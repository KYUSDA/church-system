import { useState } from "react";
import { redirect } from "react-router-dom";
import { useAuthContext } from "../context/useAuthcontext";
export const useLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const login = async (email, password, rememberMe) => {
        setError(null);
        setLoading(true);
        const url = `http://localhost:8000/kyusda/v1/member/signIn`;
        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, rememberMe })
        })
        const data = await resp.json();
        if (resp.ok) {
            //set the token and user on frontend
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({ type: 'LOGIN', payload: data });
            setLoading(false);
            redirect('/member/dashboard')
        }
        setError(data.err);
    }

    return { login, loading, error }
}