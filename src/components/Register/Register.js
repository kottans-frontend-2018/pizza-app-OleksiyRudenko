import Component from '../../Component';
import * as dom from '../../utils/dom.js';
import * as Obj from '../../utils/object.js';
import './style.css';
import * as auth from "../../utils/auth.js";

/**
 * Class representing user registration.
 */
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.host = dom.createElement();
    dom.bindHandlers(this, 'handleDefaultSubmitAction', 'handleRealSubmitAction', 'handlePasswordsMatch');
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
    container.addEventListener('submit', this.handleDefaultSubmitAction);
    container.innerHTML = `<h2>Register</h2>
    <div id="register-result"></div>
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
      <button type="button" id="register-real-submit">Sign up!</button>
      <button type="submit" class="register-hidden" id="register-default-submit">You should not see me</button>
    </form>
    <div>Have already got an account?</div>
    <a href="#/login">Login</a>
    <hr/>
    <a href="#/${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}">Random link</a>
    `;
    // TODO: Promisify templates
    setTimeout(()=>{
      document.getElementById('register-password1').addEventListener('input', this.handlePasswordsMatch);
      document.getElementById('register-password2').addEventListener('input', this.handlePasswordsMatch);
      document.getElementById('register-real-submit').addEventListener('click', this.handleRealSubmitAction);
    }, 200);
    return container;
  }

  /**
   * Handles default form submission to activate native validations
   * @param {Event} ev
   */
  handleDefaultSubmitAction(ev) {
    ev.preventDefault();
    console.log(this.name + ' handleDefaultSubmitAction');
    console.log(ev.target);
  }

  /**
   * Handles 2nd password input and its match with 1st password
   * @param {Event} ev
   */
  handlePasswordsMatch(ev) {
    const pwd1 = document.getElementById('register-password1');
    const pwd2 = document.getElementById('register-password2');
    if (pwd2.value.length) {
      pwd2.setCustomValidity(pwd1.value === pwd2.value ? "" : "Both passwords should match");
      document.getElementById('register-default-submit').click();
    }
  }

  /**
   * Handles registration submission
   * @param {Event} ev
   */
  handleRealSubmitAction(ev) {
    ev.preventDefault();
    if (!document.getElementById('register-form').reportValidity()) return;
    let fields = {};
    ['register-username', 'register-password1', 'register-password2', 'register-email'].forEach(name => {
      fields[name.split('-').slice(1).join('-')] = document.getElementById(name).value.trim()
    });

    console.log(this.name + ': Submit action invoked with credentials: ' +
      Obj.map(fields, (val,key) => key + '=`' + val +'`; '));

    const registerResultElement = document.getElementById('register-result');
    auth.register(fields.username, fields.password1, fields.email ).then( registerResult => {
      registerResultElement.classList.add('register-success');
      registerResultElement.classList.remove('register-error');
      registerResultElement.innerHTML = 'Registered successfully';
      // TODO: navigate to navigateOnSuccessTo and suggest a username for log on
    }).catch( registerResult => {
      registerResultElement.classList.remove('register-success');
      registerResultElement.classList.add('register-error');
      registerResultElement.innerHTML = registerResult.error + '<div>' + registerResult.validations.join('</div><div>') + '</div>';
      // clean up inputs and focus on username input
      const els = ['register-username', 'register-password1', 'register-password2', 'register-email'].map(elId => document.getElementById(elId));
      els.forEach(el => el.value = '');
      els[0].focus();
    });
  }
}
