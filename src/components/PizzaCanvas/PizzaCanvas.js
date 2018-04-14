import Component from '../../Component';
import * as dom from '../../utils/dom.js';

/**
 * Class representing particular order.
 * host is CANVAS element
 */
export default class PizzaCanvas extends Component {
  constructor(props) {
    super(props);
    this.ctx = this.host.getContext("2d");
    this.canvasWidth = this.canvasHeight = 320;

    this.host.width = this.canvasWidth;
    this.host.height = this.canvasHeight;
  }

  /**
   * Render view
   * @returns {HTMLElement}
   */
  render() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.fillRect(10,10,150,150);
    return '';
  }

}
