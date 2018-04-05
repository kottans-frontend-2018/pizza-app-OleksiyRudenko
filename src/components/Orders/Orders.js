import Component from '../../Component';
import * as dom from '../../utils/dom.js';
import './style.css';

/**
 * Class representing orders list.
 */
export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.host = dom.createElement({
      tag: 'div',
      id: 'orders-voidcontainer',
    });
    this.state = {
      id: props.id,
    };
  }

  render() {
    const container = dom.createElement({
      tag: 'div',
      id: 'orders-container',
      classList: ['column'],
    });

    container.innerHTML = `
      <a href="#/add" class="orders-addpizza"><i class="fas fa-plus"></i></a>
      <h2>No pizzas yet in the queue. Add one by clicking (+) below</h2>
      <!-- h2>Current orders</h2>
      <div>cccccc</div>
      <div>cccccc</div>
      <div>cccccc</div>
      <div>cccccc</div>
      <div>cccccc</div>
      <div>cccccc</div>
      <div>cccccc</div>
      <div>cccccc</div>
      <div>cccccc</div>
      <div>cccccc</div>
      <div>cccccc</div>
      <div>cccccc</div>
      <div>cccccc</div>
      <div>cc1cccc</div>
      <div>cc2cccc</div>
      <div>cc3cccc</div>
      <div>ccc4ccc</div>
      <div>cccc5cc</div>
      <div>ccccc6c</div>
      <div>cccccc7</div>
      <div>cc8cccc</div>
      <div>ccc9ccc</div>
      <div>cccccca</div>
      <div>ccccccb</div>
      <div>ccccccc</div>
      <div>ccccccd</div>
      <div>cccccce</div>
      <div>ccccccf</div>
      <div>ccccccg</div>
      <div>cccccch</div>
      <div>cccccci</div>
      <div>ccccccj</div>
      <div>cccccck</div>
      <div>ccccccl</div>
      <div>ccccccm</div>
      <div>ccccccn</div>
      <div>cccccco</div>
      <div>ccccccp</div>
      <div>ccccccq</div>
      <div>ccccccr</div>
      <div>ccccccs</div>
      <div>cccccct</div>
      <div>ccccccu</div>
      <div>ccccccv</div>
      <div>ccccccw</div>
      <div>ccccccx</div>
      <div>ccccccy</div>
      <div>ccccccz</div>
      <div>cccccczz</div>
      <div>ccccccz2</div>
      <div>ccccccz3</div>
      <div>cc1cccc</div>
      <div>cc2cccc</div>
      <div>cc3cccc</div>
      <div>ccc4ccc</div>
      <div>cccc5cc</div>
      <div>ccccc6c</div>
      <div>cccccc7</div>
      <div>cc8cccc</div>
      <div>ccc9ccc</div>
      <div>cccccca</div>
      <div>ccccccb</div>
      <div>ccccccc</div>
      <div>ccccccd</div>
      <div>cccccce</div>
      <div>ccccccf</div>
      <div>ccccccg</div>
      <div>cccccch</div>
      <div>cccccci</div>
      <div>ccccccj</div>
      <div>cccccck</div>
      <div>ccccccl</div>
      <div>ccccccm</div>
      <div>ccccccn</div>
      <div>cccccco</div>
      <div>ccccccp</div>
      <div>ccccccq</div>
      <div>ccccccr</div>
      <div>ccccccs</div>
      <div>cccccct</div>
      <div>ccccccu</div>
      <div>ccccccv</div>
      <div>ccccccw</div>
      <div>ccccccx</div>
      <div>ccccccy</div>
      <div>ccccccz</div>
      <div>cccccczz</div>
      <div>ccccccz2</div>
      <div>ccccccz3</div -->
      <a href="#/order/${Math.floor(Math.random()*100)+1}">Random order</a>
      <hr/>
      <a href="#/">Home</a>
      <a href="#/${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}">Random link</a>`;
    return container;
  }
}
