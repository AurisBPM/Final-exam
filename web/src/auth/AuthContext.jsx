import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setIsAuthorized] = useState(0);
  const updateAuth = (newExpiry) => {
    setIsAuthorized(newExpiry);
  };

  return (
    <AuthContext.Provider value={{ token, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };