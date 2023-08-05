import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg"; 
import { useLocation } from 'react-router-dom';

const Header = () => {

  const { pathname } = useLocation();

  const pathnameForData = pathname.replace(/[0-9]/g, "");


  return (
    <nav>
      <img src={logo} alt="logo" className="logo"/>
      {pathnameForData === "/customers" && (
       <Link to="/login">Log out</Link>
      )}
      
    </nav>
  );
};

export default Header;