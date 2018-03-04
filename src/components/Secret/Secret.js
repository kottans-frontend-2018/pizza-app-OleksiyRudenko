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

  render() {
    return '<h2>Secret</h2>' +
        '<div>You do not belong here! Navigate away!</div>' +
        '<div>' + Obj.map(this.state.links, ({url},name) => `<a href="#${url}">${name}</a>`) + '</div>';
  }
}
