/**
 * View component.
 * Rendering target expected at this.host, which is to be supplied by a parent component / calling context.
 * The workflow:
 * 1. Set up component (this.host|state|props}
 * 2. Do job or bind handlers
 * 3. At operational methods call {@link updateState} with object containing properties to change
 * {@link updateState} updates state and calls {@link _render}
 * {@link _render} calls overridden {@link render) and replaces this.hist.innerHTML with result from render()
 *
 * {@link render} will create HTMLElement|HTMLElement[]|DocumentFragment|string and may manage children components:
 * - call and embed children[].render() or
 * - children[].updateState()
 */
export default class ComponentBase {
  /**
   * Initializes a component with props
   * @param {object} props
   */
  constructor(props) {
    console.log('ComponentBase->' + this.name + '.constructor():in with props', props);
    this.props = props || {};
    this.state = props.state || {};
    this.host = props.host || null;
    console.log('ComponentBase->' + this.name + '.constructor():out returning nothing');
  }

  /**
   * Updates component's state. Internal method.
   * @param {object} nextState - state delta
   */
  updateState(nextState = {}) {
    console.log('ComponentBase->' + this.name + '.updateState():in with nextState', nextState);
    this.state = Object.assign({}, this.state, nextState);
    const renderedHost = this._render();
    this.updateChildrenState();
    console.log('ComponentBase->' + this.name + '.updateState():out returning', renderedHost);
    return renderedHost;
  }

  /**
   * Updates component with props and call real render method from outside.
   * @param {object} nextProps
   * @returns {HTMLElement} this.host
   */
  update(nextProps) {
    console.log('ComponentBase->' + this.name + '.update():in with nextProps', nextProps);
    this.props = Object.assign(this.props, nextProps);
    this.host = nextProps.host || this.host;
    const renderedHost = this._render();
    console.log('ComponentBase->' + this.name + '.update():out returning renderResult', renderedHost);
    return renderedHost;
  }

  /**
   * Real render method. Updates host content with a custom render method results.
   * Custom render result may feed string or an array of strings|nodes or a node
   * @returns {HTMLElement} this.host
   * @private
   */
  _render() {
    console.log('ComponentBase->' + this.name + '._render():in');
    const children = this.render();
    this.host.innerHTML = '';
    if (typeof children === 'string') {
      this.host.innerHTML = children;
    } else if (Array.isArray(children)) {
      this.host.append(...children);
    } else {
      this.host.append(children);
    }
    console.log('ComponentBase->' + this.name + '._render():out returning this.host', this.host);
    return this.host;
  }

  /**
   * Abstract method. Shall be implemented in custom component.
   * Expected to return a set of Nodes|HTMLElements|string to be assigned to this.host.innerHTML or attached to this.host
   * @override
   */
  render() {
    console.log('ComponentBase->' + this.name + '.render():in');
    console.log('ComponentBase->' + this.name + '.render():out returning ""');
    return '';
  }

  /**
   * Abstract method. Shall be implemented in custom component.
   * Expected to return a set of Nodes|HTMLElements|string to be assigned to this.host.innerHTML or attached to this.host
   * @override
   */
  updateChildrenState() {
    console.log('ComponentBase->' + this.name + '.updateChildrenState():in');
    console.log('ComponentBase->' + this.name + '.updateChildrenState():out returning nothing');
  }

  /**
   * Returns class name.
   */
  get name() {
    return this.constructor.name;
  }
}
