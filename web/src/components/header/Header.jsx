import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg"; 

const Header = () => {
  return (
    <nav>
      <img src={logo} alt="logo" className="logo"/>
      <Link to="/login">Log out</Link>
    </nav>
  );
};

export default Header;