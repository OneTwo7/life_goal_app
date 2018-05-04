import React from 'react';
import { NavLink } from 'react-router-dom';

const renderContent = (auth) => {
  if (!auth) {
    return;
  } else if (!auth._id) {
    return (<a key="3" href="/auth/google">Login with Google</a>);
  } else {
    return (<a key="4" href="/api/logout">Logout</a>);
  }
};

const Header = ({ auth }) => (
  <nav>
    <NavLink key="1" exact to="/">Goals</NavLink>
    <NavLink key="2" to="/timers">Timers</NavLink>
    {renderContent(auth)}
  </nav>
);

export default Header;
