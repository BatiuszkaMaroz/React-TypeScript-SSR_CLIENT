import { AuthEnum } from './actionTypes';
import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';

import { rootReducerType } from '../reducers';
import { AuthAction } from '../reducers/auth';

export const autoLogin = (): ThunkAction<
  void,
  rootReducerType,
  AxiosInstance,
  AuthAction
> => async (dispatch, getState, axios) => {
  try {
    const res = await axios.get('/auto_login');
    const data = res.data;

    dispatch({
      type: AuthEnum.LOGIN,
      name: data.user.name,
      email: data.user.email,
    });
  } catch (err) {}
};

export const auth = (
  endpoint: 'login' | 'signup',
  email: string,
  password: string,
  name?: string,
): ThunkAction<void, any, AxiosInstance, any> => async (
  dispatch,
  getState,
  axios,
) => {
  const userData = { name, email, password };

  const res = await axios.post(`/${endpoint}`, userData);
  const data = res.data;

  dispatch({
    type: AuthEnum.LOGIN,
    name: data.user.name,
    email: data.user.email,
  });
};

export const logout = (): ThunkAction<void, any, AxiosInstance, any> => async (
  dispatch,
  getState,
  axios,
) => {
  dispatch({ type: AuthEnum.LOGOUT });
};
