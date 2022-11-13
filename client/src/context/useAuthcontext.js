import { AuthContext } from "./authcontext";
import { useContext } from "react";
export const useAuthContext = ()=>{
    const context = useContext(AuthContext);
//return the context to use in future
    return context
}