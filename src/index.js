import Router from './components/Router';
import * as routingConfig from './routes.js';

window.router = new Router({
  host: document.getElementById(
    document.getElementById('entry-script').getAttribute('data-app-container')
  ),
  routes: routingConfig.routes,
  defaultRoute: routingConfig.defaultRoute,
});
