import Component from '../../Component';
import * as dom from '../../utils/dom.js';
import './style.css';

/**
 * Class representing page layout.
 */
export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.prerendered = this.preRender();
    console.log('Layout: ', this.props);
  }

  updateChildrenState() {
    console.log(this.name +'.updateChildrenState() in having this.state.mainComponent', this.state.mainComponent);
    this.state.mainComponent.host = this.prerendered.main;
    this.state.mainComponent.updateState();
    console.log(this.name +'.updateChildrenState() out returning nothing');
  }

  /**
   * Renders component view.
   * @returns {HTMLElement}
   */
  render() {
    return this.prerendered.fragment;
  }

  /**
   * PreRenders component view.
   * @returns {object} {fragment, elements...}
   */
  preRender() {
    console.log(this.name + '.preRender() in having ', this.state);
    const prerendered = {};
    const container = dom.createElement({
      tag: 'div',
      id: 'layout-container',
      classList: ['column'],
    });

    const mainSection = dom.createElement({
      tag: 'main',
      id: 'layout-main',
      // classList: ['shaded-content-container', 'column'],
    });

    prerendered.main = mainSection;

    dom.setChildren(container, [ dom.createElement({
      tag: 'header',
      innerHTML: `<div class="layout-optimal-width-container layout-row layout-header">
          <div id="layout-logo" class="layout-abs-center" title="Pizza Line logo"></div>
          <time id="layout-current-time" class="layout-clock" datetime="2018-01-31 00:00">00:00:00</time>
          <div id="layout-signout">
              <a href="#/logout" class="layout-logout">
                  <i class="fas fa-user-secret"></i>
                  Sign Out
              </a>
          </div>
        </div>`,
    }), mainSection, dom.createElement({
      tag: 'footer',
      innerHTML: `<div>
              <address class="layout-row"><div id="office-address">Kottans, Kottans Str.1</div>
                  <div>tel: <a href="tel:57778887">577-788-87</a></div>
              </address>
          </div>
          <div class="layout-row" id="copyright">
              <div>Pizza Manager</div> <div>&copy; <span id="copy-year">2018</span></div>
          </div>`,
    })], node => {
      console.log(this.name + '.preRender() has formed ', container , 'receiving', node);
    });
    prerendered.fragment = container;
    console.log(this.name + '.preRender() out with ', prerendered);
    return prerendered;
  }
}
