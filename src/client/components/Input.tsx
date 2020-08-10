import React, { useReducer, useEffect, useRef, Reducer } from 'react';
import { isValid } from '../utils/validator';

import styled from 'styled-components';

const StyledLabel = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 1.6rem;
  padding: 1rem 0;
  color: var(--secondary);

  p {
    margin-right: 3rem;
  }

  input {
    padding: 0.25rem;
    border: 2px solid transparent;
    border-bottom-color: var(--secondary);
    color: var(--light);
    background-color: var(--main);
    outline: none;

    &.invalid {
      border-bottom-color: red;
    }

    &.valid {
      border-bottom-color: var(--light);
    }
  }
`;

interface Props {
  name: string;
  updateValue: any;
  removeValue: any;
  validators?: any[];
}

type ActionType = { type: string; valid?: boolean; value?: any };
type StateType = {
  touched: boolean;
  valid: boolean;
  value: any;
};

const initialState: StateType = {
  touched: false,
  valid: true,
  value: '',
};

const inputReducer: Reducer<StateType, ActionType> = (state, action) => {
  switch (action.type) {
    case 'INITIAL':
      return { ...state, value: action.value!, valid: action.valid! };
    case 'TOUCH':
      return { ...state, touched: true };
    case 'CHANGE':
      return { touched: true, value: action.value!, valid: action.valid! };
    default:
      return state;
  }
};

const Input: React.FC<Props> = ({
  name,
  validators = [],
  updateValue,
  removeValue,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [{ touched, valid, value }, dispatch] = useReducer(
    inputReducer,
    initialState,
  );

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const valid = isValid(value, validators);

    dispatch({ type: 'CHANGE', valid, value });
  };

  useEffect(() => {
    if (touched) {
      if (valid) {
        inputRef.current?.classList.add('valid');
        inputRef.current?.classList.remove('invalid');
      } else {
        inputRef.current?.classList.remove('valid');
        inputRef.current?.classList.add('invalid');
      }
    }

    updateValue(name, value, valid);
  }, [touched, valid, value, inputRef]);

  useEffect(() => {
    const valid = isValid(value, validators);
    dispatch({ type: 'INITIAL', valid, value });

    return () => {
      removeValue(name);
    };
  }, []);

  return (
    <StyledLabel>
      <p>{name}:</p>
      <input
        ref={inputRef}
        onBlur={dispatch.bind(null, { type: 'TOUCH' })}
        onChange={onChangeHandler}
        value={value}
      ></input>
    </StyledLabel>
  );
};

export default Input;
