import Component from '../../Component';
import * as dom from '../../utils/dom.js';
import * as Obj from '../../utils/object.js';
import * as Url from '../../utils/url.js';

/**
 * Class representing app router.
 */
export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: props.routes,
      currentRoute: null,
      currentPath: null,
      activeComponent: null,
    };
    console.log('Router:');
    console.log(props);
    dom.bindHandlers(this, 'handleUrlChange', 'navigateTo');
    if (!this.path) {
      this.navigateTo('/');
    }
    window.addEventListener('hashchange', () => {
      this.handleUrlChange(this.path);
    });
    this.handleUrlChange(this.path);
  }

  /**
   * Returns hashed path
   * @returns {string}
   */
  get path() {
    console.log('Router get path:');
    console.log(window.location.hash.slice(1));
    return window.location.hash.slice(1);
  }

  /**
   * Handles url change
   * @param {string} path
   */
  handleUrlChange(path) {
    const { routes, currentRoute, currentPath } = this.state;
    console.log('Router handleUrlChange:');
    /* console.log(this.props);
    console.log(this.state); */
    console.log(routes);

    let nextRoute = Obj.find(routes, ({url}) => Url.isMatchingPath(url, path) );
    if (!nextRoute) nextRoute = this.state.routes[this.props.defaultRoute];
    console.log(nextRoute);
    if (!!nextRoute && (nextRoute !== currentRoute || currentPath !== path )) {
      if (nextRoute.onEnter) {
        this.handleOnEnter(nextRoute);
      }
      if (nextRoute.redirectTo) {
        this.navigateTo(this.state.routes[nextRoute.redirectTo].url);
        return;
      }
      console.log(nextRoute);
      const params = Url.extractUrlParams(nextRoute.url, path);
      this.updateState({
        activeComponent: new nextRoute.component(Object.assign({}, this.props, {host:this.host}, this.state, params)),
        currentRoute: nextRoute,
        currentPath: path,
      });
    }
  }

  /**
   * Navigate to a given url
   * @param {string} url
   */
  navigateTo(url) {
    window.location.hash = url;
  }

  /**
   * Handles on component enter event. E.g. check permissions
   * @param {function} onEnter
   */
  handleOnEnter({ onEnter }) {
    onEnter();
  }

  /**
   * Render routing
   * @returns {*|HTMLElement|string}
   */
  render() {
    const { activeComponent } = this.state;
    return activeComponent && activeComponent.render();
  }

}
