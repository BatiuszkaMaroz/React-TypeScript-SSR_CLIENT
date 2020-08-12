import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import Input from '../components/Input';
import Button from '../components/Button';

import { auth } from '../store/actions/auth';
import useForm from '../utils/hooks/useForm';
import { MAX_LENGTH, MIN_LENGTH } from '../utils/validator';

const StyledForm = styled.form`
  display: flex;
  flex-flow: column;
  justify-content: center;

  h1 {
    font-size: 3rem;
    color: var(--secondary);
    text-align: center;
    margin: 2rem;
  }

  .inputs {
    display: flex;
    flex-flow: column;

    label {
      &:first-child {
        margin-top: 2rem;
      }

      &:last-child {
        margin-bottom: 4rem;
      }
    }
  }
`;

const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState<'login' | 'signup'>('login');
  const { state, updateValue, removeValue } = useForm();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const valid = Object.keys(state).reduce((acc, key) => {
      return acc && state[key].valid;
    }, true);

    if (valid) {
      dispatch(
        auth(
          type,
          state?.email?.value,
          state?.password?.value,
          state?.name?.value,
        ),
      );
    }
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
          validators={[MIN_LENGTH(5)]}
          updateValue={updateValue}
          removeValue={removeValue}
          name='email'
        />
        <Input
          validators={[MIN_LENGTH(5), MAX_LENGTH(10)]}
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
