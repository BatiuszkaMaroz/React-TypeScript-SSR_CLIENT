import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';

import { DataAction } from '../reducers/data';
import { DataEnum } from './actionTypes';

export const fetchData = (): ThunkAction<
  void,
  any,
  AxiosInstance,
  DataAction
> => async (dispatch, getState, axios) => {
  try {
    const res = await axios.get('/secret');
    const data = res.data;

    dispatch({ type: DataEnum.FETCHED, secret: data.users });
  } catch (err) {}
};
