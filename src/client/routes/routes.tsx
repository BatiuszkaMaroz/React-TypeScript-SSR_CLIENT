import Home from '../pages/Home';
import Auth from '../pages/Auth';
import Secret from '../pages/Secret';
import Redirect from '../pages/Redirect';

export default [
  {
    path: '/',
    exact: true,
    ...Home,
  },
  {
    path: '/auth',
    ...Auth,
  },
  {
    path: '/secret',
    ...Secret,
  },
  {
    path: '/',
    ...Redirect,
  },
];
