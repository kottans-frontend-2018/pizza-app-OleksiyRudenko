import Component from '../../Component';
import * as dom from '../../utils/dom.js';
import * as Obj from '../../utils/object.js';
import './style.css';
import * as auth from "../../utils/auth.js";
import {Auth} from "../../services/Auth";
import {API} from "../../services/API";

/**
 * Class representing user registration.
 */
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.host = dom.createElement();
    dom.bindHandlers(this, 'handleDefaultSubmitAction', 'handleRealSubmitAction', 'handlePasswordsMatch', 'handleRealSubmitAction');
    console.log('Register', this.props);
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
    dom.setChildren(container, `<h2>Register</h2>
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
      <div id="register-store">
        <label for="register-store_id"><strong>Store:</strong> </label>
        <SELECT required id="register-store_id">
        </SELECT>
      </div>
      <div>
        <input required type="password" id="register-store_password" name="register-store_password" 
            minlength="8" maxlength="32" inputmode="verbatim" placeholder="Store password" title="Type password for selected store" />
        <label for="register-store_password" class="validity"></label>
      </div>
      <button type="button" class="real-submit" id="register-real-submit" disabled>Sign up!</button>
      <button type="submit" class="register-hidden" id="register-default-submit">You should not see me</button>
    </form>
    <div>Have already got an account?</div>
    <a href="#/login">Login</a>
    <hr/>
    <a href="#/${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}">Random link</a>
    `, node => {
      document.getElementById('register-username').addEventListener('input', this.handleDefaultSubmitAction);
      document.getElementById('register-email').addEventListener('input', this.handleDefaultSubmitAction);
      document.getElementById('register-store_password').addEventListener('input', this.handleDefaultSubmitAction);
      document.getElementById('register-password1').addEventListener('input', this.handleDefaultSubmitAction);
      document.getElementById('register-password2').addEventListener('input', this.handleDefaultSubmitAction);

      document.getElementById('register-password1').addEventListener('input', this.handlePasswordsMatch);
      document.getElementById('register-password2').addEventListener('input', this.handlePasswordsMatch);
      document.getElementById('register-real-submit').addEventListener('click', this.handleRealSubmitAction);
      const storeSelectElement = document.getElementById('register-store_id');
      Auth.getStoreList().then(result => {
        this.resultMessage(); // clean up result state
        result.list.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1).forEach(item => {
          const option = document.createElement('option');
          option.text = item.name;
          option.value = item.id;
          storeSelectElement.options.add(option);
        });
      }).catch(rejection => {
        if (rejection.serverError) {
          const errorUIelement = document.getElementById('register-store');
          errorUIelement.classList.add('alert');
          errorUIelement.innerHTML = `<p>Pizza server may be down or API has changed.</p> 
              <p>Please, <a href="${window.location}">try again later</a> or</p>
              <p>contact pizza server admin at <a href="${API.APIOwner}">${API.APIOwner}</a>.</p>
              <p>Server responded: ${rejection.error}</p>`;
        } else {
          this.resultMessage(rejection.error, 'error');
        }

      })
    });
    // console.log('Register.render()');
    // console.log(container);
    return container;
  }

  /**
   * Handles default form submission to activate native validations
   * @param {Event} ev
   */
  handleDefaultSubmitAction(ev) {
    ev.preventDefault();
    let enableSubmission = document.getElementById('register-form').checkValidity();
    if (document.getElementById('register-password1').value !== document.getElementById('register-password2').value) {
      enableSubmission = false;
    }
    const submitButton = document.getElementById('register-real-submit');
    if (enableSubmission) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', 'true');
    }
    // console.log(this.name + ': handleDefaultSubmitAction()', ev.target, ev);
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
    ['register-username', 'register-password1', 'register-password2', 'register-email', 'register-store_id', 'register-store_password'].forEach(name => {
      fields[name.split('-').slice(1).join('-')] = document.getElementById(name).value.trim()
    });
    fields.store_id = parseInt(fields.store_id);

    console.log(this.name + ': Submit action invoked with credentials: ', fields);

    Auth.register(fields.username, fields.password1, fields.password2, fields.email, fields.store_id, fields.store_password).then( registerResult => {
      this.resultMessage('Registered successfully');
      console.log('Register.handleRealSubmitAction() registered OK', this.props);
      if (this.props.routeProps.navigateOnSuccessToMethod) {
        setTimeout(() => {
          this.props.routeProps.navigateOnSuccessToMethod(this.props.routeProps.navigateOnSuccessToRoute, 'Registered successfully', 'success');
        }, 1500);
      }
    }).catch(rejection =>
      rejection.then(rejection => {
        console.log('Register.handleSubmitAction() rejected: ', rejection);
        this.resultMessage(rejection.error + (rejection.validations ? '<div>' + rejection.validations.join('</div><div>') + '</div>' : ''), 'error');
        // clean up inputs and focus on username input
        const els = ['register-username', 'register-password1', 'register-password2', 'register-email', 'register-store_password'].map(elId => document.getElementById(elId));
        els.forEach(el => el.value = '');
        els[0].focus();
      })
    );
  }

  /**
   * Shows error or success message
   * @param {string} message
   * @param {string} type
   */
  resultMessage(message ='', type = 'success') {
    const classToAdd = 'register-' + type;
    const classToRemove = 'register-' + (type === 'success' ? 'error' : 'success');
    const registerResultElement = document.getElementById('register-result');
    registerResultElement.classList.remove(classToRemove);
    registerResultElement.classList.add(classToAdd);
    registerResultElement.innerHTML = message;
  }
}
