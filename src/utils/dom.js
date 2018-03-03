/**
 * Creates an HTML element
 * @param {object} options
 * @returns {HTMLElement}
 *
 * options: { tag:string,
 *            id:string,
 *            classList:string|[...string],
 *            attr: {attr-name:attr-value},
 *            children:HTMLElement|[...HTMLElement]
 *            innerHTML:string }
 */
export const createElement = function(options={tag:'div'}) {
  if (!options) options = 'div';
  if (typeof options === 'string' || options instanceof String) {
    options = { tag: options };
  }
  if (!options.tag) {
    options.tag = 'div';
  }
  const element = document.createElement(options.tag);
  if (!!options.id) element.id = options.id;
  if (!!options.classList) {
    if (typeof options.classList === 'string' || options.classList instanceof String) {
      options.classList = [ options.classList ];
    }
    options.classList.forEach(className => { element.classList.add(className);});
  }
  if (!!options.attr) {
    Object.keys(options.attr).forEach(key => {
      element.setAttribute(key, options.attr[key]);
    });
  }
  if (!!options.innerHTML) {
    element.innerHTML = options.innerHTML;
  }
  if (!!options.children) {
    if (!Array.isArray(options.children)) options.children = [options.children];
    options.children.forEach(child => {
      element.appendChild(child);
    });
  }
  return element;
};

/**
 * Clones element reassigning id
 * @param {HTMLElement} node
 * @param {string} id
 * @param {boolean=true} deep
 * @returns {Node}
 */
export const cloneNodeAs = function(node, id, deep = true) {
  const element = node.cloneNode(deep);
  element.id = id;
  return element;
};

/**
 * Binds methods by their names to a given context.
 * @param {Object} context
 * @param {...methodNames} method names to bind
 */
export const bindHandlers = (context, ...methodNames) => {
  methodNames.forEach(name => {
    if (typeof context[name] === 'function') {
      context[name] = context[name].bind(context);
    } else {
      throw Error(
        `dom-utils.bindHandlers() expected function ${name}. Received ${typeof context[name]} instead.`
      );
    }
  });
};

/**
 * DOM mutation observer. Used when some element gets updated via .innerHTML.
 * Usage:
 * const observer = new DOMMutationObserver(function(mutationsList){}); // register a callback to invoke upon mutation
 * const config = {attributes: true, childList: true};
 * observer.observe(targetNode, config);
 * observer.disconnect(); // Stop observing when not required anymore
 * // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
 */
export const DOMMutationObserver =  window.MutationObserver || window.WebKitMutationObserver;
