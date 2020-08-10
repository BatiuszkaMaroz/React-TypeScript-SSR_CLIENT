import React, { useReducer, Reducer, useState, useCallback } from 'react';
import styled from 'styled-components';
import Input from '../components/Input';
import Button from '../components/Button';
import { MAX_LENGTH, MIN_LENGTH } from '../utils/validator';

const StyledForm = styled.form`
  display: flex;
  flex-flow: column;
  justify-content: center;

  h1 {
    font-size: 3rem;
    color: var(--secondary);
    text-align: center;
    padding: 2rem;
  }

  .inputs {
    display: flex;
    flex-flow: column;

    div {
      display: flex;
      justify-content: space-between;
    }
  }
`;

type Action = {
  type: 'ADD' | 'REMOVE';
  name: string;
  value?: any;
  valid?: boolean;
};

const authReducer: Reducer<any, Action> = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        [action.name]: { value: action.value, valid: action.valid },
      };
    case 'REMOVE':
      const stateCopy = { ...state };
      delete stateCopy[action.name];
      return stateCopy;
    default:
      return state;
  }
};

const Auth: React.FC = () => {
  const [type, setType] = useState<'login' | 'signup'>('login');
  const [state, dispatch] = useReducer(authReducer, {});

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(state);
  };

  const updateValue = (name: string, value: any, valid: boolean) => {
    dispatch({ type: 'ADD', name, value, valid });
  };

  const removeValue = (name: string) => {
    dispatch({ type: 'REMOVE', name });
  };

  const renderName = () => {
    if (type === 'signup') {
      return (
        <Input
          updateValue={updateValue}
          removeValue={removeValue}
          name='name'
        />
      );
    } else {
      return null;
    }
  };

  const changeType = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    setType((prev) => {
      if (prev === 'login') {
        return 'signup';
      } else {
        return 'login';
      }
    });
  }, []);

  return (
    <StyledForm onSubmit={submitHandler}>
      <h1>{type.toUpperCase()}</h1>
      <div className='inputs'>
        {renderName()}
        <Input
          updateValue={updateValue}
          removeValue={removeValue}
          name='email'
        />
        <Input
          validators={[MIN_LENGTH(5)]}
          updateValue={updateValue}
          removeValue={removeValue}
          name='password'
        />
      </div>
      <Button>Submit</Button>
      <Button onClick={changeType}>Change Type</Button>
    </StyledForm>
  );
};

export default { component: Auth };
