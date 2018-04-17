import Component from '../../Component';
import {PizzaImagery} from "../../services/PizzaImagery";
import {CANVAS} from './settings';

/**
 * Class representing pizza constructed image.
 * host is a <canvas> element
 */
export default class PizzaCanvas extends Component {
  constructor(props) {
    super(props);
    this.ctx = this.host.getContext("2d");

    this.host.width = CANVAS.px.width;
    this.host.height = CANVAS.px.height;
  }

  /**
   * Render view
   * @returns {HTMLElement|string}
   */
  render() {
    this.ctx.clearRect(0, 0, CANVAS.px.width, CANVAS.px.height);
    // this.ctx.fillRect(10,10,150,150);
    console.log(this.name + '.render() state', this.state);
    this.drawPizzaBase();
    this.drawIngredients();
    return '';
  }

  /**
   * Draws ingredients
   */
  drawIngredients() {
    const area = CANVAS.areas[this.state.size];
    console.log(this.name + '.drawIngredients() area', area);

    const ingredientsCount = Object.keys(this.state.ingredients).length;

    const nodes = this._distributeNodesEvenly(area.nodes, ingredientsCount);

    Object.keys(this.state.ingredients).forEach((item, idx) => {
      PizzaImagery.getImage(item)
        .then(image => {
          const coordSet = nodes[idx];
          for(let i = coordSet.length - 1; i >= 0; i--) {
            const polar = coordSet[i];
            this._drawImage(image, polar.r, polar.asimuth, CANVAS.ingredient.width, CANVAS.ingredient.height);
          }
        })
        .catch(rejection => console.log(this.name + '.drawIngredients() REJECTED', rejection));
    });
  }

  /**
   * Distributes array of nodes evenly across count groups
   * @param {array} nodes [{r,asimuth}...]
   * @param {number} count
   * @returns {array} [[{r,asimuth}...]...]
   * @private
   */
  _distributeNodesEvenly(nodes, count) {
    const groupedNodes = [];
    const len = nodes.length;
    const times = Math.ceil(len / count);
    for (let i = 0; i < count; i++) {
      groupedNodes[i] = [];
      for (let j = 0; j < times; j++) {
        if (j*count+i < len) {
          groupedNodes[i].push(nodes[j*count+i]);
        }
      }
    }
    return groupedNodes;
  }

  /**
   * Draws scaled pizza base
   */
  drawPizzaBase() {
    PizzaImagery.getImage('pizza')
      .then(image => {
        const pxDimension = this.state.size * CANVAS.pxInch;
        image.width = pxDimension;
        image.height = pxDimension;
        console.log(this.name + '.drawPizzaBase()', image);
        this._drawImage(image, 0, 0, pxDimension, pxDimension);
        /* const img = new Image(pxDimension, pxDimension);
        img.src = image.src;
        img.onload = () => this.ctx.drawImage(img, 0, 0); */
      })
      .catch(rejection => console.log(this.name + '.drawPizzaBase() REJECTED', rejection));
  }

  /**
   * Draws an image where its center is in polar coordinates (r,azimuth)
   * @param {HTMLimageElement} image
   * @param {number} r
   * @param {number} azimuth
   * @param {number} width
   * @param {number} height
   * @private
   */
  _drawImage(image, r, azimuth, width=0, height=0) {
    if (!width) width = image.width;
    if (!height) height = image.height;
    const dx = -Math.round(width / 2);
    const dy = -Math.round(height / 2);
    const realCoordinates = this._polar2carthesian(r, azimuth);
    this.ctx.drawImage(image, realCoordinates.x + dx, realCoordinates.y + dy, width, height);
  }

  /**
   * Converts polar coordinates
   * @param {number} r
   * @param {number} azimuth
   * @returns {object} {x,y} ready to draw at, based on CANVAS settings
   * @private
   */
  _polar2carthesian(r, azimuth) {
    const radians = azimuth * Math.PI / 180;
    const x = Math.round(r * Math.cos(radians) + CANVAS.center.x);
    const y = Math.round(-r * Math.sin(radians) + CANVAS.center.y);
    return { x, y };
  }
}
