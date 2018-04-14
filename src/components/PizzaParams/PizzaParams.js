import Component from '../../Component';
import * as dom from '../../utils/dom.js';

/**
 * Class representing particular order.
 */
export default class PizzaParams extends Component {
  constructor(props) {
    super(props);
    this.prerendered = this.preRender();
  }

  /**
   * Render view
   * @returns {HTMLElement}
   */
  render() {
    return this.prerendered.fragment;
  }

  /**
   * PreRenders component view.
   * @returns {object} {fragment, elements...}
   */
  preRender() {
    console.log(this.name + '.preRender() in having ', this.state);
    const container = dom.createElement({
      tag: 'div',
      id: 'pizzaConstructor-container',
      classList: ['row-wrap'],
    });

    container.innerHTML = `
    <h2>Constructor</h2>
    `;

    /* const canvas = dom.createElement('canvas');
    const params = dom.createElement('div');

    dom.setChildren(container, [ canvas, params ]); */

    return {
      fragment: container,
    };
  }

}
