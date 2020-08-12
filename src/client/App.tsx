import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { renderRoutes } from 'react-router-config';
import { useDispatch } from 'react-redux';

import { autoLogin } from './store/actions/auth';
import routes from './routes/routes';
import Header from './components/Header';

const GlobalStyles = createGlobalStyle`
  :root {
    --main: #383e56;
    --secondary: #f69e7b;
    --light: #eedad1;
    --medium: #d4b5b0;
  }

  *,
  *::before,
  *::after {
    padding: 0;
    margin: 0;
    box-sizing: inherit;
    font: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  body {
    background-color: #383e56;
    font-size: 1.6rem;
    font-family: 'Raleway', sans-serif;
  }

  main {
    padding: 3rem;
    display: flex;
    justify-content: center;
  }
`;

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  return (
    <>
      <GlobalStyles />
      <Header />
      <main>{renderRoutes(routes)}</main>
    </>
  );
};

export default App;
