import React from 'react';
import styled from 'styled-components';

interface Props {
  [x: string]: any;
}

const StyledButton = styled.button`
  padding: 1rem 2rem;
  border: 3px solid var(--secondary);
  margin-top: 2rem;
  font-size: 2rem;
  color: var(--secondary);
  background-color: transparent;
  transition: 100ms ease-in-out;
  outline: none;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  &:active {
    transform: translateY(0px);
  }
`;

const Button: React.FC<Props> = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
