import React from "react";
import logo from "../assets/img/logo.png";

const Header = () => {
  return (
    <header className="page-header">
      <img width="200" height="55" src={logo} alt="logo" />
      <p className="page-header__score">
        Score:<span>0</span>
      </p>
    </header>
  );
};

export default Header;
