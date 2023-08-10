import { createContext, useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setIsAuthorized] = useState(null);
  const [isLoading, setLoading] = useState(true); 
  const updateAuth = (newToken) => {
    setIsAuthorized(newToken);
  };

  useEffect(() => {
    const existingToken = localStorage.getItem('token');
    console.log("existing");
    console.log(existingToken);

    if (existingToken) {
      updateAuth(existingToken);
    }
    setLoading(false);
  }, []); 

  return isLoading ? (
     <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  ) : (
    
    <AuthContext.Provider value={{ token, updateAuth }}>
    {children}
  </AuthContext.Provider>
  )
};

export { AuthContextProvider, AuthContext };