import Component from '../../Component';
import * as dom from '../../utils/dom.js';
import * as Obj from "../../utils/object";

/**
 * Class representing particular order.
 */
export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params.id,
    };
  }

  render() {
    const container = dom.createElement({
      tag: 'div',
      id: 'order-container',
      classList: ['shaded-content-container', 'column'],
    });

    container.innerHTML = `<h2>Order #${this.state.id}</h2>
      <a href="#/order/${Math.floor(Math.random()*100)+1}">Random order</a>
      <hr/>
      <a href="#/">Home</a>
      <a href="#/${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}">Random link</a>`;
    return container;
  }
}
