import { useState } from "react";
import { json , redirect} from "react-router-dom";
import { useAuthContext } from "../context/useAuthcontext";
export const useLogin = ()=>{
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(null);
    const {dispatch} = useAuthContext();
const login = async(email,password)=>{
        setError(null);
        setLoading(true);
        const url = `http://localhost:8000/kyusda/v1/member/signIn`;
        const resp = await fetch(url,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password}),
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
redirect('/')
}
    }

    return {login,loading,error}
}