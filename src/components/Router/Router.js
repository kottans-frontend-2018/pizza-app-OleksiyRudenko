import Component from '../../Component';
import * as dom from '../../utils/dom.js';
import * as Obj from '../../utils/object.js';

/**
 * Class representing app router.
 */
export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: props.routes,
      currentRoute: null,
      activeComponent: null,
    };
    console.log('Router:');
    console.log(props);
    dom.bindHandlers(this, 'handleUrlChange', 'navigateTo');
    window.addEventListener('hashchange', () => {
      this.handleUrlChange(this.path);
    });
    this.handleUrlChange(this.path);
  }

  get path() {
    console.log('Router get path:');
    console.log(window.location.hash.slice(1));
    return window.location.hash.slice(1);
  }

  handleUrlChange(path) {
    const { routes, currentRoute } = this.state;
    console.log('Router handleUrlChange:');
    console.log(this.props);
    console.log(this.state);
    console.log(routes);
    let nextRoute = Obj.find(routes, ({url}) => url === path);
    if (!nextRoute) nextRoute = this.state.routes[this.props.defaultRoute];
    console.log(nextRoute);
    if (!!nextRoute && nextRoute !== currentRoute) {
      if (nextRoute.onEnter) {
        this.handleOnEnter(nextRoute);
      }
      if (nextRoute.redirectTo) {
        this.navigateTo(this.state.routes[nextRoute.redirectTo].url);
      }
      console.log(nextRoute);
      this.updateState({
        activeComponent: new nextRoute.component(Object.assign({}, this.props, {host:this.host}, this.state)),
        currentRoute: nextRoute,
      });
    }
  }

  navigateTo(url) {

    window.location.hash = url;
  }

  handleOnEnter({ onEnter }) {
    onEnter();
  }

  render() {
    const { activeComponent } = this.state;
    return activeComponent && activeComponent.render();
  }

}
