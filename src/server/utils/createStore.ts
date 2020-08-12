import { Request } from 'express';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from './axios';
import rootReducer from '../../client/store/reducers';

export default (req: Request) => {
  axios.defaults.headers.common['cookie'] = req.get('cookie');

  const store = createStore(
    rootReducer,
    {},
    applyMiddleware(thunk.withExtraArgument(axios)),
  );

  return store;
};
