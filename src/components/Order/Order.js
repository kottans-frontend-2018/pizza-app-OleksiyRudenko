import Component from '../../Component';
import * as dom from '../../utils/dom.js';
import * as Obj from "../../utils/object";

/**
 * Class representing user login.
 */
export default class Order extends Component {
  constructor(props) {
    super(props);
    this.host = dom.createElement({
      tag: 'div',
      id: 'order-container',
    });
    this.state = {
      id: props.id,
    };
  }

  render() {
    const container = dom.createElement({
      tag: 'div',
      id: 'secret-container',
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
