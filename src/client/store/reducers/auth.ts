import { Reducer, Action } from 'redux';
import { AuthEnum } from '../actions/actionTypes';

const initialState = {
  name: '',
  email: '',
};

interface AuthState {
  name: string;
  email: string;
}

export interface AuthAction extends Action {
  name?: string;
  email?: string;
}

const authReducer: Reducer<AuthState, AuthAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case AuthEnum.LOGIN:
      return { name: action.name!, email: action.email! };
    case AuthEnum.LOGOUT:
      return { name: '', email: '' };
    default:
      return state;
  }
};

export default authReducer;
