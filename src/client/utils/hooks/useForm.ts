import { useReducer, Reducer, useCallback } from 'react';

type Action = {
  type: 'ADD' | 'REMOVE';
  name: string;
  value?: boolean | string | number;
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

const useForm = () => {
  const [state, dispatch] = useReducer(authReducer, {});

  const updateValue = useCallback(
    (name: string, value: any, valid: boolean) => {
      dispatch({ type: 'ADD', name, value, valid });
    },
    [],
  );

  const removeValue = useCallback((name: string) => {
    dispatch({ type: 'REMOVE', name });
  }, []);

  return {
    state,
    updateValue,
    removeValue,
  };
};

export default useForm;
