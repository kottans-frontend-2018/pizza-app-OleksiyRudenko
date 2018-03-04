import Login from './components/Login';
import Register from './components/Register';
import Secret from './components/Secret';
import Order from './components/Order';

export const routes = {
  root: {
    url: '/',
    redirectTo: 'login',
  },
  login: {
    url: '/login',
    component: Login,
  },
  register: {
    url: '/register',
    component: Register,
  },
  order: {
    url: '/order/:id',
    redirectUnauthorizedTo: 'login',
    component: Order,
  },
  secret: {
    url: '/secret',
    component: Secret,
  },
};

export const defaultRoute = 'secret';
