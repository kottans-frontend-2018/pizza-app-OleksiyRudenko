import Component from '../../Component';
import * as dom from '../../utils/dom.js';

/**
 * Class representing user registration.
 */
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.host = dom.createElement({
      tag: 'div',
      id: 'register-container',
    });
  }

  render() {
    return `<h2>Register</h2>`;
  }
}
