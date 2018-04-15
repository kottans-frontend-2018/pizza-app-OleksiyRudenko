import Component from '../../Component';
import PizzaParams from '../PizzaParams';
import PizzaCanvas from '../PizzaCanvas';
import * as dom from '../../utils/dom.js';
import './style.css';

/**
 * Class representing particular order.
 */
export default class PizzaEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    dom.bindHandlers(this, 'onParamsChange');
    this.prerendered = this.preRender();
    const pizzaInitialState = {
      size: 60,
      ingredients: {},
      tags: {},
      name: '',
      description: '',
    };
    this.children = {
      pizzaCanvas: new PizzaCanvas({
        host: this.prerendered.canvas,
        state: pizzaInitialState,
      }),
      pizzaConstructor: new PizzaParams({
        host: this.prerendered.params,
        onParamsChange: this.onParamsChange,
        state: pizzaInitialState,
      }),
    };
  }

  /**
   * Updates pizzaCanvas when pizza params changed within pizzaConstructor
   * @param {object} state
   */
  onParamsChange(state) {
    this.children.pizzaCanvas.updateState(state);
  }

  /**
   * Called within Component workflow
   */
  updateChildrenState() {
    this.children.pizzaConstructor.updateState();
    this.children.pizzaCanvas.updateState();
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
      id: 'pizzaEditor-container',
      classList: ['row-wrap'],
    });

    const canvas = dom.createElement('canvas');
    const canvasContainer = dom.createElement({
      tag: 'div',
      classList: ['pizzaEditor-canvas'],
    });
    canvasContainer.appendChild(canvas);
    const params = dom.createElement('div');

    dom.setChildren(container, [ canvasContainer, params ]);

    return {
      fragment: container,
      canvas: canvas,
      params: params,
    };
  }

}
