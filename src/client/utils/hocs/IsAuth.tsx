import React from 'react';
import { Redirect } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';

const IsAuth = (Component: React.FC) => {
  const Wrapper: React.FC = () => {
    const authenticated = useTypedSelector((state) => !!state.auth.email);

    if (authenticated) {
      return <Component />;
    } else {
      return <Redirect to='/auth' />;
    }
  };

  return Wrapper;
};

export default IsAuth;
