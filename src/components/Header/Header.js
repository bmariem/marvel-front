import React from "react";
import { Link } from "react-router-dom";

// CSS
import "./Header.css";

// images
import logo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src={logo} alt="marvel" />
        </Link>
      </div>
      <div className="header-navigation">
        <div className="navigation">
          <Link to="/comics">Comics</Link>
          <Link to="/">Characters</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
