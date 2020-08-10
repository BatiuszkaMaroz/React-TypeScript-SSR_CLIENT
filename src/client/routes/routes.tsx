import Home from '../pages/Home';
import Auth from '../pages/Auth';

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
];
