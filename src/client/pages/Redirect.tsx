import React from 'react';
import { Redirect as RedirectComponent } from 'react-router-dom';

const Redirect = ({ staticContext = {} }) => {
  (staticContext as any).notFound = true;

  return <RedirectComponent to='/' />;
};

export default { component: Redirect };
