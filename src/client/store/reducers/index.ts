import { combineReducers } from 'redux';

import auth from './auth';
import data from './data';

const rootReducer = combineReducers({ auth, data });
export type rootReducerType = ReturnType<typeof rootReducer>;

export default rootReducer;
