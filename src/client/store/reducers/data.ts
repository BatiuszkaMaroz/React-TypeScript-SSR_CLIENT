import { DataEnum } from '../actions/actionTypes';
import { Action, Reducer } from 'redux';

interface DataState {
  secret: any[];
}

export interface DataAction extends Action {
  secret: any[];
}

const initialState = {
  secret: [],
};

const dataReducer: Reducer<DataState, DataAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case DataEnum.FETCHED:
      return { secret: action.secret! };
    default:
      return state;
  }
};

export default dataReducer;
