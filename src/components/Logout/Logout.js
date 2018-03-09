import Component from '../../Component';
import * as dom from '../../utils/dom.js';
import * as auth from '../../utils/auth.js';

/**
 * Class representing user logout.
 */
export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.host = dom.createElement();
    dom.bindHandlers(this, 'handleLogoutAction');
  }

  /**
   * Renders component view.
   * @returns {HTMLElement}
   */
  render() {
    const container = dom.createElement({
      tag: 'div',
      id: 'logout-container',
    });
    container.addEventListener('click', this.handleLogoutAction);
    container.innerHTML = `<a href="#/logout">Sign out</a>`;
    return container;
  }

  /**
   * Handles logout user action.
   * @param {Event} ev
   */
  handleLogoutAction(ev) {
    auth.logout();
  }
}
