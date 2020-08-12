import React from 'react';
import { NavLink } from 'react-router-dom';

import { useTypedSelector } from '../utils/hooks/useTypedSelector';

const Links: React.FC = () => {
  const authenticated = useTypedSelector((state) => !!state.auth.email);

  return (
    <nav>
      <NavLink exact to='/'>
        Home
      </NavLink>
      <NavLink to='/auth'>Auth</NavLink>
      {authenticated && <NavLink to='/secret'>Secret</NavLink>}
    </nav>
  );
};

export default Links;
