import React from 'react';
import { Link } from 'react-router-dom';

import Links from './Links';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  color: var(--main);
  background-color: var(--secondary);

  a {
    font-size: 3.5rem;
    font-weight: 500;
    color: var(--main);
    text-decoration: none;
  }

  nav {
    display: flex;

    a {
      display: block;
      padding: 1rem;
      border-width: 3px;
      border-style: solid;
      border-color: transparent;
      font-size: 2rem;
      color: var(--main);
      transition: 100ms ease-in-out;
      text-decoration: none;

      &.active,
      &:hover {
        border-color: var(--main);
      }

      &:not(:last-child) {
        margin-right: 2rem;
      }
    }
  }
`;

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Link to='/'>Server Outsider</Link>
      <Links />
    </StyledHeader>
  );
};

export default Header;
