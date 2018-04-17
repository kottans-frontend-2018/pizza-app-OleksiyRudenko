import Component from '../../Component';
import * as dom from '../../utils/dom.js';
import {Auth} from '../../services/Auth';
import './style.css';

const PIZZA_SIZES = [30, 45, 60];

/**
 * Class representing pizza constructor.
 */
export default class PizzaParams extends Component {
  constructor(props) {
    super(props);
    console.log('PizzaParams constructor; state', this.state);
    dom.bindHandlers(this, 'handleUserAction', 'handleSubmit');
    this.prerendered = this.preRender();
  }

  /**
   * Supplies state to caller's context
   */
  handleUserAction(ev) {
    console.log(this.name + '.onUserAction() in with event', ev, 'and state', this.state);
    const trackedParams = ['pizza-size', 'pizza-ingredient']; // , 'pizza-tag'];
    const target = ev.target;
    let doUpdate = false;
    if (trackedParams.includes(target.name)) {
      console.log(this.name + '.onUserAction() event on tracked item', target);
      switch (target.name) {
        case 'pizza-size': this.state.size = parseInt(target.value); break;
        case 'pizza-ingredient':
          if (target.checked) {
            this.state.ingredients[target.value] = target.value;
          } else {
            delete this.state.ingredients[target.value];
          }
          break;
        /* case 'pizza-tag':
          if (target.checked) {
            this.state.tags[target.value] = target.value;
          } else {
            delete this.state.tags[target.value];
          }
          break; */
      }
      doUpdate = true;
    }

    console.log(this.name + '.onUserAction() about to out with state', this.state);
    if (doUpdate) {
      this.props.onParamsChange(this.state);
    }
  }

  /**
   * Manages submit action
   */
  handleSubmit(ev) {
    ev.preventDefault();
    console.log(this.name + '.onSubmit()', ev, 'and state', this.state);
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
      tag: 'form',
      id: 'pizzaConstructor-container',
      classList: ['pizzaParams-container'],
    });

    container.addEventListener('change', this.handleUserAction);
    container.addEventListener('submit', this.handleSubmit);

    const checkedSizeValue = this._getPizzaSizeCheckedArray();
    const pizzaSizeRadios = '<fieldset><legend>Size</legend>' + PIZZA_SIZES.reduce((html, size, idx) => html + `
      <input type="radio" id="pizza-size-${idx}" name="pizza-size" value="${size}"${checkedSizeValue[size]}>
      <label for="pizza-size-${idx}">${size}</label>
    `, '') + '</fieldset>';
    container.innerHTML =  '<input required type="text" id="pizza-name" value="' + this.state.name + '" placeholder="Pizza order name">' +
      '<textarea id="pizza-description" placeholder="Pizza description">' + this.state.description + '</textarea>' +
      pizzaSizeRadios;
    const sets = ['ingredient', 'tag'];
    Promise.all([Auth.getIngredients(), Auth.getTags()])
      .then(list => {
        console.log(this.name + '.preRender()', list);
        for (let i = 0; i < 2; ++i) {
          const el = dom.createElement('fieldset');
          el.innerHTML = '<legend>' + sets[i] + '</legend>' +
            list[i].reduce((html, item) => html + `<input type="checkbox" id="pizza-${sets[i]}-${item.id}" name="pizza-${sets[i]}" value="${item.name}">
            <label for="pizza-${sets[i]}-${item.id}">${item.description}</label>`,
            '');
          container.appendChild(el);
        }
        container.appendChild(dom.createElement({
          tag: 'button',
          // attr: {type: 'button'},
          innerHTML: 'Submit',
        }));
        container.appendChild(dom.createElement({
          tag: 'button',
          attr: {type: 'button'},
          innerHTML: 'Cancel',
          classList: 'alert-background',
        }));
      });

    /* const canvas = dom.createElement('canvas');
    const params = dom.createElement('div');

    dom.setChildren(container, [ canvas, params ]); */

    return {
      fragment: container,
    };
  }

  /**
   * Returns array of checked state per each size
   * @returns {Array}
   * @private
   */
  _getPizzaSizeCheckedArray() {
    const checkedSize = [];
    for (let i = PIZZA_SIZES.length - 1; i >= 0; --i) {
      checkedSize[PIZZA_SIZES[i]] = '';
    }
    checkedSize[this.state.size] = ' CHECKED';
    return checkedSize;
  }

}
