import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  margin-top: 10rem;
  text-align: center;

  h1 {
    margin-top: 2rem;
    color: var(--secondary);
    font-size: 2rem;
  }

  img {
    width: 30rem;
  }
`;

const Home: React.FC = () => {
  return (
    <StyledDiv>
      <img src='/static/cat.jpg' alt='' />
      <h1>Hello, it's your new home!</h1>
    </StyledDiv>
  );
};

export default {
  component: Home,
};
