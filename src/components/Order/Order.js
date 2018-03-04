import Component from '../../Component';
import * as dom from '../../utils/dom.js';

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
    return `<h2>Order #${this.state.id}</h2>`;
  }
}
