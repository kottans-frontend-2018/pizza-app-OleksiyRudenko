import Component from '../../Component';
import * as dom from '../../utils/dom.js';

/**
 * Class representing orders list.
 */
export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.host = dom.createElement({
      tag: 'div',
      id: 'orders-container',
    });
    this.state = {
      id: props.id,
    };
  }

  render() {
    const container = dom.createElement({
      tag: 'div',
      id: 'orders-container',
      classList: ['shaded-content-container', 'column'],
    });

    container.innerHTML = `<h2>Current orders</h2>
      <a href="#/order/${Math.floor(Math.random()*100)+1}">Random order</a>
      <hr/>
      <a href="#/">Home</a>
      <a href="#/${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}">Random link</a>`;
    return container;
  }
}
