import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <nav>
    <NavLink exact to="/">Goals</NavLink>
    <NavLink to="/timers">Timers</NavLink>
  </nav>
);

export default Header;
