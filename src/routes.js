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
    name: 'Home',
    url: '/',
    redirectUnauthorizedToRoute: 'login',
    redirectAuthorizedToRoute: 'orders',
  },
  login: {
    name: 'Sign in',
    url: '/login',
    component: Login,
    navigateOnSuccessToRoute: 'orders',
    routes: ['register'], // router will xform [routeName1,...] to {routeName1:{name:,url:},..}
  },
  logout: {
    name: 'Sign out',
    url: '/logout',
    component: Logout,
    navigateOnSuccessToRoute: 'login',
  },
  register: {
    name: 'Register',
    url: '/register',
    component: Register,
    navigateOnSuccessToRoute: 'login',
    routes: ['login'],
  },
  orders: {
    name: 'Orders queue',
    url: '/orders',
    redirectUnauthorizedToRoute: 'login',
    layout: true, // use Layout component
    component: Orders,
  },
  order: {
    name: 'Pizza',
    url: '/order/:id',
    redirectUnauthorizedToRoute: 'login',
    component: Order,
  },
  secret: {
    url: '/secret',
    component: Secret,
    routes: ['home', 'login', 'register', 'orders', 'order'],
  },
};

export const defaultRoute = 'secret';
