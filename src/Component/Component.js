/**
 * View component.
 * Rendering target expected at this.host.
 * The workflow:
 * 1. Set up component (this.host|state|props}
 * 2. Do job or bind handlers
 * 3. At operational methods call {@link updateState} with object containing properties to change
 * {@link updateState} updates state and calls {@link _render}
 * {@link _render} calls overridden {@link render) and replaces this.hist.innerHTML with result from render()
 *
 * {@link render} will create HTMLElement(s)|DocumentFragment and may call and embed children[].render()
 */
export default class ComponentBase {
  /**
   * Initializes a component with props
   * @param {object} props
   */
  constructor(props) {
    console.log('ComponentBase->' + this.name + '.constructor():in with props', props);
    this.props = props || {};
    this.state = {};
    this.host = props.host || null;
    console.log('ComponentBase->' + this.name + '.constructor():out returning nothing');
  }

  /**
   * Updates component's state. Internal method.
   * @param {object} nextState - state delta
   */
  updateState(nextState) {
    console.log('ComponentBase->' + this.name + '.updateState():in with nextState', nextState);
    this.state = Object.assign({}, this.state, nextState);
    const rendered = this._render();
    console.log('ComponentBase->' + this.name + '.updateState():out returning', rendered);
    return rendered;
  }

  /**
   * Updates component with props and call real render method from outside.
   * @param {object} nextProps
   * @returns {HTMLElement} this.host
   */
  update(nextProps) {
    console.log('ComponentBase->' + this.name + '.update():in with nextProps', nextProps);
    this.props = nextProps;
    const renderResult = this._render();
    console.log('ComponentBase->' + this.name + '.update():out returning renderResult', renderResult);
    return renderResult;
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
   * @override
   */
  render() {
    console.log('ComponentBase->' + this.name + '.render():in');
    console.log('ComponentBase->' + this.name + '.render():out returning ""');
    return '';
  }

  /**
   * Returns class name.
   */
  get name() {
    return this.constructor.name;
  }
}
