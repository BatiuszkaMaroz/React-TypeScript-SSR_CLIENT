import React from 'react';
import { NavLink } from 'react-router-dom';

const Links: React.FC = () => {
  return (
    <nav>
      <NavLink exact to='/'>
        Home
      </NavLink>
      <NavLink to='/auth'>Auth</NavLink>
    </nav>
  );
};

export default Links;
