export default class ComponentBase {
  /**
   * Initializes a component with props
   * @param {object} props
   */
  constructor(props) {
    this.props = props || {};
    this.state = {};
    this.host = props.host || null;
  }

  /**
   * Updates component's state
   * @param {object} nextState - state delta
   */
  updateState(nextState) {
    this.state = Object.assign({}, this.state, nextState);
    this._render();
  }

  /**
   * Updates component with props and call real render method
   * @param {object} nextProps
   * @returns {HTMLElement} this.host
   */
  update(nextProps) {
    this.props = nextProps;
    return this._render();
  }

  /**
   * Real render method. Updates host content with a custom render method results.
   * Custom render result may feed string or an array of strings|nodes or a node
   * @returns {HTMLElement} this.host
   * @private
   */
  _render() {
    const children = this.render();
    this.host.innerHTML = '';
    if (typeof children === 'string') {
      this.host.innerHTML = children;
    } else if (Array.isArray(children)) {
      this.host.append(...children);
    } else {
      this.host.append(children);
    }
    return this.host;
  }

  /**
   * Abstract method. Shall be implemented in custom component.
   */
  render() {
    return '';
  }

  /**
   * Returns class name.
   */
  get name() {
    return this.constructor.name;
  }
}
