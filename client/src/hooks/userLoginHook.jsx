import { useState } from "react";
import { redirect } from "react-router-dom";
import { useAuthContext } from "../context/useAuthcontext";
export const useLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const login = async (email, password) => {
        setError(null);
        setLoading(true);
        const url = `https://kyusdabackend.azurewebsites.net/kyusda/v1/member/signIn`;
        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        console.log(resp)
        const data = await resp.json();

        // if(!resp.ok){
        // console.log(data)
        // setError(data.err);
        // setLoading(false);
        // }
        if (resp.ok) {
            //set the token and useron frontend
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({ type: 'LOGIN', payload: data });
            setLoading(false);
            redirect('/member')
        }
    }

    return { login, loading, error }
}