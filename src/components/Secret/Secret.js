import Component from '../../Component';
import * as dom from '../../utils/dom.js';
import * as Obj from '../../utils/object.js';

/**
 * Class representing app secret page.
 */
export default class Secret extends Component {
  constructor(props) {
    super(props);
    this.host = dom.createElement({
      tag: 'div',
      id: 'secret-container',
    });
    this.state = {
      links: this.props.routes,
    };
    console.log(this.name);
    console.log(this.props);
    console.log(this.state);
  }

  /**
   * Renders component view
   * @returns {HTMLElement}
   */
  render() {
    const container = dom.createElement({
      tag: 'div',
      id: 'secret-container',
      classList: ['shaded-content-container', 'column'],
    });

    const links = Obj.map(this.state.links, ({url},name) => {
      if (url.search(':id') >= 0 ) {
        url = url.replace(':id', Math.floor(Math.random() * 100) + 1);
      }
      return `<a href="#${url}">${name}</a>`
    });

    container.innerHTML = '<h2>Secret place</h2>' +
        '<p>Kinda 404, you know...</p>' +
        '<p>You do not belong here! Navigate away!</p>' +
        '<div>' + links.join('</div><div>') + '</div>';
    return container;
  }
}
