import Router from './components/Router';
import Layout from './components/Layout';
import * as routingConfig from './routes.js';

const rootHost = document.getElementById(document.getElementById('entry-script').getAttribute('data-app-container'));

window.router = new Router({
  host: rootHost,
  routes: routingConfig.routes,
  defaultRoute: routingConfig.defaultRoute,
  layoutManager: new Layout({
    host: rootHost,
  }),
});
