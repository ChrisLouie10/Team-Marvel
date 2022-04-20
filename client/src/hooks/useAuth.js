import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

/* 
    Essentially combines these two imports into a usable hook
    for ease of use across components that need authContext
*/
const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;