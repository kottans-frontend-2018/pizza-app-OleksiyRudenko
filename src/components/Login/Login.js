import Component from '../../Component';
import * as dom from '../../utils/dom.js';

/**
 * Class representing user login.
 */
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.host = dom.createElement();
    dom.bindHandlers(this, 'handleSubmitAction');
  }

  /**
   * Renders component view.
   * @returns {HTMLElement}
   */
  render() {
    const container = dom.createElement({
      tag: 'div',
      id: 'login-container',
      classList: ['shaded-content-container', 'column'],
    });
    container.addEventListener('submit', this.handleSubmitAction);
    container.innerHTML = `<h2>Login</h2>
    <form id="login-form" method="POST" target="#/login">
      <div>
        <input required type="text" id="login-username" name="login-username" 
            minlength="2" maxlength="24" inputmode="verbatim" placeholder="User name" title="Type your user name in" />
        <label for="login-username" class="validity"></label>
      </div>
      <div>
        <input required type="password" id="login-password" name="login-password" 
            minlength="8" maxlength="32" inputmode="verbatim" placeholder="Password" title="Type your password in" />
        <label for="login-password" class="validity"></label>
      </div>
      <button type="submit" id="login-submit">Sign in!</button>
    </form>
    <a href="#/register">Register</a>
    <a href="#/${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}">Random link</a>
    `;
    return container;
  }

  /**
   * Handles credentials submission.
   * @param {Event} ev
   */
  handleSubmitAction(ev) {
    ev.preventDefault();
    let username, password;
    [username, password] = [ ev.target.elements['login-username'].value.trim(),
      ev.target.elements['login-password'].value.trim() ];
    console.log(this.name + `: Submit action invoked with credentials: {${username}:${password}}`);
  }
}
