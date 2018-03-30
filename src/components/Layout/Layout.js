import Component from '../../Component';
import * as dom from '../../utils/dom.js';
import './style.css';

/**
 * Class representing page layout.
 */
export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.host = dom.createElement({
      id: 'layout-supercontainer',
    });
    console.log('Layout: ', this.props);
  }

  /**
   * Renders component view.
   * @returns {HTMLElement}
   */
  render() {
    console.log('Layout.render() in having ', this.state);
    const container = dom.createElement({
      tag: 'div',
      id: 'layout-container',
      classList: ['column'],
    });
    dom.setChildren(container, `<header>
        <div class="layout-optimal-width-container layout-row layout-header">
          <div id="layout-logo" class="layout-abs-center" title="Pizza Line logo"></div>
          <time id="layout-current-time" class="layout-clock" datetime="2018-01-31 00:00">00:00:00</time>
          <div id="layout-signout">
              <button type="button" class="layout-header-button">
                  <i class="fas fa-user-secret"></i>
                  Sign Out
              </button>
          </div>
        </div>
    </header>
    `, node => {
      console.log('Layout.render() has formed ', container , 'receiving', node);
      console.log('Layout.render() will embed outcome from', this.state.mainComponent);
      const mainComponentView = this.state.mainComponent.render();
      console.log('...which is', mainComponentView);
      const mainSection = dom.createElement({
        tag: 'main',
        id: 'layout-main',
        // classList: ['shaded-content-container', 'column'],
      });
      mainSection.appendChild(mainComponentView);
      node.appendChild(mainSection);
      const footer = dom.createElement({
        tag: 'footer',
      });
      footer.innerHTML = `
          <div>
              <address class="layout-row"><div id="office-address">Kottans, Kottans Str.1</div>
                  <div>tel: <a href="tel:57778887">577-788-87</a></div>
              </address>
          </div>
          <div class="layout-row" id="copyright">
              <div>Pizza Manager</div> <div>&copy; <span id="copy-year">2018</span></div>
          </div>
      `;
      node.appendChild(footer);
      /* console.log('Layout.render() injects ', mainComponentView);
      dom.setChildren(node.getElementById('layout-main'), mainComponentView, node => {
        console.log('Layout.render() has formed(2) ', container);
      }); */
      console.log('Layout.render() has formed(2) ', node);
    });
    console.log('Layout.render() out with ', container);
    return container;
  }
}
