import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Secret from './components/Secret';
import Order from './components/Order';
import Orders from './components/Orders';

export const routes = {
  home: {
    url: '/',
    redirectTo: 'login',
  },
  login: {
    url: '/login',
    component: Login,
    navigateOnSuccessTo: 'orders',
  },
  logout: {
    url: '/logout',
    component: Logout,
    navigateOnSuccessTo: 'login',
  },
  register: {
    url: '/register',
    component: Register,
    navigateOnSuccessTo: 'login',
  },
  orders: {
    url: '/orders',
    redirectUnauthorizedTo: 'login',
    component: Orders,
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
