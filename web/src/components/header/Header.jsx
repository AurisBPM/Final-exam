import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg"; 
import { useLocation } from 'react-router-dom';
import { Stack } from "@mui/material";


const Header = () => {

  const { pathname } = useLocation();

  const pathnameForData = pathname.replace(/[0-9]/g, "");


  return (
    <nav>
      <img src={logo} alt="logo" className="logo"/>
      {pathnameForData === "/customers" && (
        <Stack direction="row" spacing={2}>
          <Link to="/add">Add Customer</Link>
       <Link to="/login">Log out</Link>
        </Stack>
      )}
      {pathnameForData === "/add" && (
        <Stack direction="row" spacing={2}>
          <Link to="/customers">Customers</Link>
       <Link to="/login">Log out</Link>
        </Stack>
      )}
      
    </nav>
  );
};

export default Header;