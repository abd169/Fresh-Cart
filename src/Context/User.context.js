import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState } from "react";
export const UserContext = createContext(null);
export default function UseProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    function logOut() {
        setToken(null);
        localStorage.removeItem("token");
    }
    return _jsx(UserContext.Provider, { value: { token, logOut, setToken }, children: children });
}
