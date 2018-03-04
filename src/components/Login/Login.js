import Component from '../../Component';
import * as dom from '../../utils/dom.js';

/**
 * Class representing user login.
 */
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.host = dom.createElement({
      tag: 'div',
      id: 'login-container',
    });
  }

  render() {
    return `<h2>Login</h2>
    <form class="login-form" method="POST" target="#/login">
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
      <button type="submit">Login</button>
    </form>
    <a href="#/register">Register</a>
    <a href="#/${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}">Random link</a>
    `;
  }
}
