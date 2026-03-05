import { createContext, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");

  let initialUser = null;

  if (storedToken) {
    try {
      initialUser = jwtDecode(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    } catch (err) {
      localStorage.clear();
    }
  }

  const [user, setUser] = useState(initialUser);
  const [token, setToken] = useState(storedToken);
  const [loading] = useState(false); // No async loading needed

  const login = (decodedUser, jwtToken) => {
    setUser(decodedUser);
    setToken(jwtToken);

    localStorage.setItem("token", jwtToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
