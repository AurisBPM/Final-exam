import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import Layout from "../components/layout/Layout";
import { useJwt } from "react-jwt";





const PrivateRoutes = () => {
  const { token } = useContext(AuthContext);
  const { isExpired } = useJwt(token);
  return !isExpired ? <Layout /> : <Navigate to="/login" />;
  
  
};

export default PrivateRoutes;