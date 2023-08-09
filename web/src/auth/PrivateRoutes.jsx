import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import Layout from "../components/layout/Layout";



const PrivateRoutes = () => {
  const { token } = useContext(AuthContext);

  console.log("auth context");
  console.log(token);
  //can check JWT instead of just simple date as in example
  const isValidUser = token ? true : false;

  return isValidUser ? <Layout /> : <Navigate to="/login" />;
};

export default PrivateRoutes;