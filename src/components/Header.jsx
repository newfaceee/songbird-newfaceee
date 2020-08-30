import React from 'react';
import { useSelector } from 'react-redux';
import logo from '../assets/img/logo.png';

const Header = React.memo(() => {
  const score = useSelector(({ score }) => score);
  return (
    <header className="page-header">
      <img width="200" height="55" src={logo} alt="logo" />
      <p className="page-header__score">
        Score:<span>{score}</span>
      </p>
    </header>
  );
});

export default Header;
