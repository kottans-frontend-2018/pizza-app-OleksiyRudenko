import Component from '../../Component';
import * as dom from '../../utils/dom.js';
import * as Obj from '../../utils/object.js';

/**
 * Class representing user registration.
 */
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.host = dom.createElement();
    dom.bindHandlers(this, 'handleSubmitAction', 'handlePasswordsMatch');
  }

  /**
   * Renders component view
   * @returns {HTMLElement}
   */
  render() {
    const container = dom.createElement({
      tag: 'div',
      id: 'register-container',
      classList: ['shaded-content-container', 'column'],
    });
    container.addEventListener('submit', this.handleSubmitAction);
    container.innerHTML = `<h2>Register</h2>
    <form id="register-form" method="POST" target="#/login">
      <div>
        <input required type="text" id="register-username" name="register-username" 
            minlength="2" maxlength="24" inputmode="verbatim" placeholder="User name" title="Type your user name in" />
        <label for="register-username" class="validity"></label>
      </div>
      <div>
        <input required type="password" id="register-password1" name="register-password1" 
            minlength="8" maxlength="32" inputmode="verbatim" placeholder="Password" title="Type your password in" />
        <label for="register-password1" class="validity"></label>
      </div>
      <div>
        <input required type="password" id="register-password2" name="register-password2" 
            minlength="6" maxlength="32" inputmode="verbatim" placeholder="Password once again" title="Type your password in once again" />
        <label for="register-password2" class="validity"></label>
      </div>
      <div>
        <input required type="email" id="register-email" name="register-email" 
            minlength="8" maxlength="32" inputmode="email" placeholder="E-mail" title="Type your e-mail in" />
        <label for="register-email" class="validity"></label>
      </div>
      <button type="submit" id="register-submit">Sign up!</button>
    </form>
    <div>Have already got an account?</div>
    <a href="#/login">Login</a>
    <hr/>
    <a href="#/${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}">Random link</a>
    `;
    setTimeout(()=>{
      document.getElementById('register-password1').addEventListener('input', this.handlePasswordsMatch);
      document.getElementById('register-password2').addEventListener('input', this.handlePasswordsMatch);
    }, 200);
    return container;
  }

  /**
   * Handles registration form submission
   * @param {Event} ev
   */
  handleSubmitAction(ev) {
    ev.preventDefault();
    let fields = {};
    ['register-username', 'register-password1', 'register-password2', 'register-email'].forEach(name => {
      fields[name.split('-').slice(1).join('-')] = ev.target.elements[name].value.trim()
    });
    console.log(this.name + ': Submit action invoked with credentials: ' +
      Obj.map(fields, (val,key) => key + '=`' + val +'`; '));
  }

  /**
   * Handles 2nd password input and its match with 1st password
   * @param {Event} ev
   */
  handlePasswordsMatch(ev) {
    const pwd1 = document.getElementById('register-password1');
    const pwd2 = document.getElementById('register-password2');
    pwd2.setCustomValidity(pwd1.value === pwd2.value ? "" : "Both passwords should match");
    document.getElementById('register-submit').click();
  }
}
