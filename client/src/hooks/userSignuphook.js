import { useState } from "react";
import { json } from "react-router-dom";
import { useAuthContext } from "../context/useAuthcontext";
export const useSignup = ()=>{
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(null);
    const {dispatch} = useAuthContext();
const signup = async(firstName,lastName,registration,
        email,course,year,password,passwordConfirm)=>{
        setError(null);
        setLoading(true);
        const url = `https://localhost:3000/kyusda/v1/member/signUp`;
        const resp = await fetch(url,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({firstName,lastName,registration,
        email,course,year,password,passwordConfirm}),
            credentials:'include',
            withCredentials:true
        })
        const data = await resp.json();
if(!resp.ok){
    console.log(data.error)
setError(data.err);
setLoading(false);
}
if(resp.ok){
    //set the token and useron frontend
    localStorage.setItem('user',JSON.stringify(data));
    dispatch({type:'LOGIN',payload:data});
setLoading(false);
}
    }

    return {signup,loading,error}
}