import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Secret from './components/Secret';
import Order from './components/Order';
import Orders from './components/Orders';

export const routes = {
  none: {
    url: '',
    redirectToRoute: 'home',
  },
  home: {
    url: '/',
    redirectUnauthorizedToRoute: 'login',
    redirectAuthorizedToRoute: 'orders',
  },
  login: {
    url: '/login',
    component: Login,
    navigateOnSuccessToRoute: 'orders',
  },
  logout: {
    url: '/logout',
    component: Logout,
    navigateOnSuccessToRoute: 'login',
  },
  register: {
    url: '/register',
    component: Register,
    navigateOnSuccessToRoute: 'login',
  },
  orders: {
    url: '/orders',
    redirectUnauthorizedToRoute: 'login',
    component: Orders,
  },
  order: {
    url: '/order/:id',
    redirectUnauthorizedToRoute: 'login',
    component: Order,
  },
  secret: {
    url: '/secret',
    component: Secret,
  },
};

export const defaultRoute = 'secret';
