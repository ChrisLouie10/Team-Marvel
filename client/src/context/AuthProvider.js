import { createContext, useState } from "react";

/*
    Using React Contexts to have state persist across components,
    essentially having the idea of "global" state
*/
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [data, setData] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth, data, setData }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;