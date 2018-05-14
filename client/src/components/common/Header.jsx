import React from 'react';
import { NavLink } from 'react-router-dom';

const renderContent = (auth) => {
  if (!auth) {
    return;
  } else if (!auth._id) {
    return (
      <div key="login" id="login">
        <a href="/auth/google">Login with Google</a>
      </div>
    );
  } else {
    return [
      <div key="logout" id="login"><a href="/api/logout">Logout</a></div>,
      <div key="links" id="links">
        <NavLink exact to="/">Goals</NavLink>
        <NavLink to="/timers">Timers</NavLink>
      </div>
    ];
  }
};

const Header = ({ auth }) => (
  <nav>
    {renderContent(auth)}
  </nav>
);

export default Header;
