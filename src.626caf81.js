// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({53:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * View component.
 * Rendering target expected at this.host, which is to be supplied by a parent component / calling context.
 * The workflow:
 * 1. Set up component (this.host|state|props}
 * 2. Do job or bind handlers
 * 3. At operational methods call {@link updateState} with object containing properties to change
 * {@link updateState} updates state and calls {@link _render}
 * {@link _render} calls overridden {@link render) and replaces this.hist.innerHTML with result from render()
 *
 * {@link render} will create HTMLElement|HTMLElement[]|DocumentFragment|string and may manage children components:
 * - call and embed children[].render() or
 * - children[].updateState()
 */
var ComponentBase = function () {
  /**
   * Initializes a component with props
   * @param {object} props
   */
  function ComponentBase(props) {
    _classCallCheck(this, ComponentBase);

    console.log('ComponentBase->' + this.name + '.constructor():in with props', props);
    this.props = props || {};
    this.state = props.state || {};
    this.host = props.host || null;
    console.log('ComponentBase->' + this.name + '.constructor():out returning nothing');
  }

  /**
   * Updates component's state. Internal method.
   * @param {object} nextState - state delta
   */


  _createClass(ComponentBase, [{
    key: 'updateState',
    value: function updateState() {
      var nextState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      console.log('ComponentBase->' + this.name + '.updateState():in with nextState', nextState);
      this.state = Object.assign({}, this.state, nextState);
      var renderedHost = this._render();
      this.updateChildrenState();
      console.log('ComponentBase->' + this.name + '.updateState():out returning', renderedHost);
      return renderedHost;
    }

    /**
     * Updates component with props and call real render method from outside.
     * @param {object} nextProps
     * @returns {HTMLElement} this.host
     */

  }, {
    key: 'update',
    value: function update(nextProps) {
      console.log('ComponentBase->' + this.name + '.update():in with nextProps', nextProps);
      this.props = Object.assign(this.props, nextProps);
      this.host = nextProps.host || this.host;
      var renderedHost = this._render();
      console.log('ComponentBase->' + this.name + '.update():out returning renderResult', renderedHost);
      return renderedHost;
    }

    /**
     * Real render method. Updates host content with a custom render method results.
     * Custom render result may feed string or an array of strings|nodes or a node
     * @returns {HTMLElement} this.host
     * @private
     */

  }, {
    key: '_render',
    value: function _render() {
      console.log('ComponentBase->' + this.name + '._render():in');
      var children = this.render();
      this.host.innerHTML = '';
      if (typeof children === 'string') {
        this.host.innerHTML = children;
      } else if (Array.isArray(children)) {
        var _host;

        (_host = this.host).append.apply(_host, _toConsumableArray(children));
      } else {
        this.host.append(children);
      }
      console.log('ComponentBase->' + this.name + '._render():out returning this.host', this.host);
      return this.host;
    }

    /**
     * Abstract method. Shall be implemented in custom component.
     * Expected to return a set of Nodes|HTMLElements|string to be assigned to this.host.innerHTML or attached to this.host
     * @override
     */

  }, {
    key: 'render',
    value: function render() {
      console.log('ComponentBase->' + this.name + '.render():in');
      console.log('ComponentBase->' + this.name + '.render():out returning ""');
      return '';
    }

    /**
     * Abstract method. Shall be implemented in custom component.
     * Expected to return a set of Nodes|HTMLElements|string to be assigned to this.host.innerHTML or attached to this.host
     * @override
     */

  }, {
    key: 'updateChildrenState',
    value: function updateChildrenState() {
      console.log('ComponentBase->' + this.name + '.updateChildrenState():in');
      console.log('ComponentBase->' + this.name + '.updateChildrenState():out returning nothing');
    }

    /**
     * Returns class name.
     */

  }, {
    key: 'name',
    get: function get() {
      return this.constructor.name;
    }
  }]);

  return ComponentBase;
}();

exports.default = ComponentBase;
},{}],48:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Component = require('./Component.js');

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_Component).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./Component.js":53}],39:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Callback for manipulating Node entry key and value.
 *
 * @callback onNodeReady
 * @param {Node} node
 */

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
var createElement = exports.createElement = function createElement() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { tag: 'div' };

  if (!options) options = 'div';
  if (typeof options === 'string' || options instanceof String) {
    options = { tag: options };
  }
  if (!options.tag) {
    options.tag = 'div';
  }
  var element = document.createElement(options.tag);
  if (!!options.id) element.id = options.id;
  if (!!options.classList) {
    if (typeof options.classList === 'string' || options.classList instanceof String) {
      options.classList = [options.classList];
    }
    options.classList.forEach(function (className) {
      element.classList.add(className);
    });
  }
  if (!!options.attr) {
    Object.keys(options.attr).forEach(function (key) {
      element.setAttribute(key, options.attr[key]);
    });
  }
  if (!!options.innerHTML) {
    element.innerHTML = options.innerHTML;
  }
  if (!!options.children) {
    if (!Array.isArray(options.children)) options.children = [options.children];
    options.children.forEach(function (child) {
      element.appendChild(child);
    });
  }
  return element;
};

/**
 * Renders DOM structure from string
 * @param {string} string
 * @param {onNodeReady} onReady to call when elements from string are rendered
 */
var toDOM = exports.toDOM = function toDOM(string, onReady) {
  var fragment = document.createDocumentFragment();
  var helperElement = document.createElement('div');
  // console.log('toDOM()');
  helperElement.innerHTML = string.trim();
  (function iterativeRenderer() {
    if (helperElement.firstChild) {
      // Array.from(helperElement.childNodes).forEach(el => fragment.appendChild(el));
      fragment.appendChild(helperElement.firstChild);
      setTimeout(iterativeRenderer, 0); // arguments.callee
    } else {
      // console.log(helperElement);
      // console.log(fragment);
      onReady && onReady(fragment);
    }
  })();
  // return fragment;
};

/**
 * Reassigns children to the node
 * @param {Node} node
 * @param {string|HTMLCollection|Node|[Node...]|DocumentFragment} children
 * @param {onNodeReady} onReady to call when elements from string are rendered
 */
var setChildren = exports.setChildren = function setChildren(node, children) {
  var onReady = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (typeof children === 'string') {
    toDOM(children, function (fragment) {
      return _setChildren(node, fragment, onReady);
    });
  } else {
    _setChildren(node, children, onReady);
  }
};

/**
 * Reassigns children to the node. String not accepted!
 * @param {Node} node
 * @param {HTMLCollection|Node|[Node...]|DocumentFragment} children
 * @param {onNodeReady} onReady to call when elements appended
 */
var _setChildren = exports._setChildren = function _setChildren(node, children) {
  var onReady = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (children === '[object HTMLCollection]') {
    children = Array.from(children);
  }
  node = clearChildren(node);
  if (Array.isArray(children)) {
    children.forEach(function (child) {
      return typeof child === 'string' ? toDOM(child, function (fragment) {
        return node.appendChild(fragment);
      }) : node.appendChild(child);
    });
  } else {
    node.appendChild(children);
  }
  onReady && onReady(node);
};

/**
 * Clears node children
 * @param {Node} node
 * @returns {Node}
 */
var clearChildren = exports.clearChildren = function clearChildren(node) {
  // node.innerHTML = '';
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
  return node;
};

/**
 * Clones element reassigning id
 * @param {HTMLElement} node
 * @param {string} id
 * @param {boolean=true} deep
 * @returns {Node}
 */
var cloneNodeAs = exports.cloneNodeAs = function cloneNodeAs(node, id) {
  var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var element = node.cloneNode(deep);
  element.id = id;
  return element;
};

/**
 * Binds methods by their names to a given context.
 * @param {Object} context
 * @param {...methodNames} method names to bind
 */
var bindHandlers = exports.bindHandlers = function bindHandlers(context) {
  for (var _len = arguments.length, methodNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    methodNames[_key - 1] = arguments[_key];
  }

  methodNames.forEach(function (name) {
    if (typeof context[name] === 'function') {
      context[name] = context[name].bind(context);
    } else {
      throw Error('dom-utils.bindHandlers() expected function ' + name + '. Received ' + _typeof(context[name]) + ' instead.');
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
var DOMMutationObserver = exports.DOMMutationObserver = window.MutationObserver || window.WebKitMutationObserver;
},{}],40:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * Callback for manipulating object entry key and value.
 *
 * @callback manipulateObjectEntry
 * @param {string} value - entry value
 * @param {string} key - entry key
 */

/**
 * Array.map style shallow object mapping
 * @param {object} obj
 * @param {manipulateObjectEntry} fn (value, key)
 * @returns {array}
 */
var map = exports.map = function map(obj, fn) {
  return Object.keys(obj).map(function (key) {
    return fn(obj[key], key);
  });
};

var OBJECT_FIND_RESULT_VALUE_ONLY = exports.OBJECT_FIND_RESULT_VALUE_ONLY = false;
var OBJECT_FIND_RESULT_KEYVALUE = exports.OBJECT_FIND_RESULT_KEYVALUE = true;
/**
 * Callback for testing object entry based on its key and/or value.
 *
 * @callback testObjectEntry
 * @param {string} value - entry value
 * @param {string} key - entry key
 * @returns {boolean}
 */
/**
 * Array.find style shallow object search
 * @param {object} obj
 * @param {testObjectEntry} fn (value, key)
 * @param {boolean|string} resultMode
 * @returns {*} undefined if not found
 *
 * Result mode explained.
 * Source Object may contain references to objects or other types
 * e.g. { key0: {...}, key1: 5, key2: [...] })
 *
 * resultMode:
 * - OBJECT_FIND_RESULT_VALUE_ONLY - will return found value only if any
 * - OBJECT_FIND_RESULT_KEYVALUE - will return { keyX: ... } for valid test if any
 * - arbitrary scalar value {number|string} - will return either of:
 *   - if value is object than it will be added with a {returnMode_Value: key}
 *   - otherwise value will be embedded into an object {returnMode_Value: key, data: value}
 */
var find = exports.find = function find(obj, fn) {
  var resultMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : OBJECT_FIND_RESULT_VALUE_ONLY;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.entries(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = _slicedToArray(_ref, 2);

      var key = _ref2[0];
      var value = _ref2[1];

      if (fn(value, key)) {
        if (resultMode === OBJECT_FIND_RESULT_VALUE_ONLY) return value;
        if (resultMode === OBJECT_FIND_RESULT_KEYVALUE) {
          var result = {};
          result[key] = value;
          return result;
        }
        // we've got a scalar to use as a key identifier
        if (!isObject(value)) {
          value = { data: value };
        }
        value[resultMode] = key;
        return value;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return undefined;
};

/**
 * Array.filter style shallow object filtering
 * @param {object} obj
 * @param {testObjectEntry} fn (value, key)
 * @returns {object} empty if neither key-value passes the test
 */
var filter = exports.filter = function filter(obj, fn) {
  var result = {};
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = Object.entries(obj)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _ref3 = _step2.value;

      var _ref4 = _slicedToArray(_ref3, 2);

      var key = _ref4[0];
      var value = _ref4[1];

      if (fn(value, key)) {
        result[key] = value;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return result;
};

/**
 * Checks if item is an Object (and not also an Array or null).
 * @param item
 * @returns {boolean}
 */
var isObject = exports.isObject = function isObject(item) {
  return (typeof item === "undefined" ? "undefined" : _typeof(item)) === "object" && !Array.isArray(item) && item !== null;
};
},{}],41:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* Templated url methods */

var URL_PARAM_REGEXP = exports.URL_PARAM_REGEXP = /(:[^\/]+)/g;
var urlToRegexp = function urlToRegexp(url) {
  return RegExp('^' + url.replace(URL_PARAM_REGEXP, '([^/]+)') + '$');
};

var isMatchingPath = exports.isMatchingPath = function isMatchingPath(template, url) {
  template = urlToRegexp(template);
  // console.log('Match ' + template + ' vs ' + url + ' = ' + template.test(url));
  return template.test(url);
};

var containsUrlParams = exports.containsUrlParams = function containsUrlParams(path) {
  return URL_PARAM_REGEXP.test(path);
};

var extractUrlParams = exports.extractUrlParams = function extractUrlParams(template, url) {
  var params = {};
  var values = url.split('/');
  if (!values) {
    return params;
  }
  return template.split('/').reduce(function (acc, param, idx) {
    if (!containsUrlParams(param)) {
      return acc;
    }
    acc[param.slice(1)] = values[idx];
    return acc;
  }, params);
};
},{}],55:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var APIService = function () {
  function APIService(_ref) {
    var endPoint = _ref.endPoint,
        assetBase = _ref.assetBase;

    _classCallCheck(this, APIService);

    if (endPoint.length && endPoint[endPoint.length - 1] !== '/') endPoint += '/';
    this.endPoint = endPoint;
    this.assetBase = assetBase;
    this.APIOwner = 'https://github.com/lempiy/Kottans-Pizza-Api/';
  }

  // ====== API methods

  // ------ STORE
  /**
   * Get store list via API
   * @returns {Promise<{success: boolean, list: []}>}
   */


  _createClass(APIService, [{
    key: 'getStoreList',
    value: function getStoreList() {
      return this._get('store/list', false).then(function (result) {
        console.log('API.getStoreList(): responded', result);
        return {
          success: true,
          list: result
        };
      });
    }

    // ------ USERS
    /**
     * Creates user via API
     * @param {object} registrationData
     * @returns {Promise}
     */

  }, {
    key: 'createUser',
    value: function createUser() {
      var registrationData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      registrationData = Object.assign({
        username: null,
        password: null,
        password_repeat: null,
        email: null,
        store_id: 0,
        store_password: null
      }, registrationData);
      console.log('API.createUser() request for', registrationData);
      return this._post('user/create', registrationData, false).then(function (result) {
        console.log('API.createUser(): responded', result);
        return result;
      });
    }

    /**
     * Gets and stores auth token on success via API
     * @param {object} loginData
     * @returns {Promise}
     */

  }, {
    key: 'login',
    value: function login() {
      var _this = this;

      var loginData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      loginData = Object.assign({
        username: null,
        password: null
      }, loginData);
      return this._post('user/login', loginData, false).then(function (result) {
        _this._setToken(result.token);
        console.log('API.login(): responded', result);
        return result;
      });
    }

    /**
     * Gets current user info via API
     * @returns {Promise<{success: boolean}>}
     */

  }, {
    key: 'getUserInfo',
    value: function getUserInfo() {
      return this._get('user/my_info').then(function (result) {
        console.log('API.getUserInfo(): responded', result);
        return Object.assign({
          success: true
        }, result);
      });
    }

    /**
     * Removes current token
     */

  }, {
    key: 'logout',
    value: function logout() {
      this._setToken(null);
    }

    // ------ PIZZA
    /**
     * Gets pizza list via API
     * @param {object} params - url params
     * @returns {Promise<{success: boolean}>}
     */

  }, {
    key: 'getPizzaList',
    value: function getPizzaList() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      params = Object.assign({
        offset: 0,
        limit: 100
      }, params);
      return this._get('pizza/list', params).then(function (result) {
        console.log('API.getPizzaList(): responded', result);
        return Object.assign({
          success: true
        }, result);
      });
    }

    /**
     * Creates pizza via API
     * @param {object} pizzaProps
     * @returns {Promise}
     */

  }, {
    key: 'createPizza',
    value: function createPizza() {
      var pizzaProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      pizzaProps = Object.assign({
        name: null,
        description: null,
        size: 30,
        ingredients: JSON.toString([]),
        tags: JSON.toString([]),
        image: null
      }, pizzaProps);
      return this._post('pizza/create', pizzaProps).then(function (result) {
        console.log('API.createPizza(): responded', result);
        return result;
      });
    }

    // ------ INGREDIENT
    /**
     * Gets ingredients list via API
     * @param {object} params - url params
     * @returns {Promise<{success: boolean}>}
     */

  }, {
    key: 'getIngredientList',
    value: function getIngredientList() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      params = Object.assign({
        offset: 0,
        limit: 100
      }, params);
      return this._get('ingredient/list', params).then(function (result) {
        console.log('API.getIngredientList(): responded', result);
        return Object.assign({
          success: true
        }, result);
      });
    }

    // ------ TAG
    /**
     * Gets tags list via API
     * @param {object} params - url params
     * @returns {Promise<{success: boolean}>}
     */

  }, {
    key: 'getTagList',
    value: function getTagList() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      params = Object.assign({
        offset: 0,
        limit: 100
      }, params);
      return this._get('tag/list', params).then(function (result) {
        console.log('API.getTagList(): responded', result);
        return Object.assign({
          success: true
        }, result);
      });
    }

    // ------ Assets

  }, {
    key: 'prependAssetUrl',
    value: function prependAssetUrl(url) {
      return this.assetBase + url;
    }

    // ====== Core private methods

    /**
     * Makes GET request via API
     * @param {string} resource - partial resource
     * @param {object} params - url parameters
     * @param {boolean} isAuthRequired
     * @returns {Promise}
     * @private
     */

  }, {
    key: '_get',
    value: function _get(resource) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var isAuthRequired = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === _typeof(true)) {
        isAuthRequired = params;
        params = {};
      }
      var urlParams = new URLSearchParams();
      Object.keys(params).forEach(function (key) {
        urlParams.append(key, params[key]);
      });
      if (urlParams.toString().length) {
        resource += '?' + urlParams;
      }
      return isAuthRequired && !this._getToken() ? Promise.reject({
        success: false,
        error: 'Authorization required'
      }) : this._request('get', resource, {
        headers: this._headers({}, isAuthRequired)
      });
    }

    /**
     * Makes POST request via API
     * @param {string} resource
     * @param {*} data
     * @param {boolean} isAuthRequired
     * @returns {Promise}
     * @private
     */

  }, {
    key: '_post',
    value: function _post(resource, data) {
      var isAuthRequired = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return isAuthRequired && !this._getToken() ? Promise.reject({
        success: false,
        error: 'Authorization required'
      }) : this._request('post', resource, {
        body: JSON.stringify(data),
        headers: this._headers({}, isAuthRequired)
      });
    }

    /**
     * Makes an API call
     * @param {string} method
     * @param {string} resource
     * @param {object} params
     * @returns {Promise}
     * @private
     */

  }, {
    key: '_request',
    value: function _request(method, resource) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var url = this._makeUrl(resource);
      params = Object.assign({
        /* cache: 'no-cache',              // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin',     // include, same-origin, *omit */
        method: method.toUpperCase() // *GET, POST, PUT, DELETE, etc.
        /* mode: 'cors',                   // no-cors, cors, *same-origin
        redirect: 'follow',             // *manual, follow, error
        referrer: 'client',             // *client, no-referrer */
      }, params);
      console.log('API._request: requested', url, params);
      return fetch(url, params).then(function (response) {
        var contentType = response.headers.get("content-type");
        var contentTypeIsJSON = !!(contentType && contentType.includes("application/json"));
        console.log('API._request: responded', response);
        if (!response.ok) {
          console.log('API._request: NOT OK', response.status, response.statusText);
          if (contentTypeIsJSON) {
            return response.json().then(function (json) {
              return Promise.reject(json);
            });
          } else throw {
            success: false,
            error: response.status + ': ' + response.statusText
          };
        }
        return contentTypeIsJSON ? response.json() : response;
      }).catch(function (rejection) {
        console.log('API._request: rejection Before', rejection);
        // Error => {success:false, error:'...'}
        if (rejection.success !== false) {
          rejection = {
            success: false,
            serverError: true,
            error: rejection
          };
        }
        console.log('API._request: rejection', rejection);
        throw rejection;
      });
    }

    /**
     * Compiles request headers
     * @param {object} headersData
     * @param {boolean} isAuthRequired
     * @returns {Headers}
     * @private
     */

  }, {
    key: '_headers',
    value: function _headers() {
      var headersData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var isAuthRequired = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (isAuthRequired) {
        headersData.authorization = headersData.authorization || 'Bearer ' + this._getToken();
      }
      var headers = new Headers();
      headersData = Object.assign({
        accept: 'application/json'
      }, headersData);
      Object.keys(headersData).forEach(function (key) {
        headers.append(key, headersData[key]);
      });
      return headers;
    }

    /**
     * Makes complete request url
     * @param {string} resource
     * @returns {string}
     * @private
     */

  }, {
    key: '_makeUrl',
    value: function _makeUrl(resource) {
      return this.endPoint + resource;
    }
  }, {
    key: '_getToken',
    value: function _getToken() {
      return window.localStorage.getItem('token');
    }
  }, {
    key: '_setToken',
    value: function _setToken() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (value === null) {
        window.localStorage.removeItem('token');
      } else {
        window.localStorage.setItem('token', value);
      }
      return value;
    }
  }]);

  return APIService;
}();

var API = exports.API = new APIService({
  endPoint: 'https://pizza-tele.ga/api/v1/',
  assetBase: 'https://pizza-tele.ga/'
});
},{}],50:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _API = require('./API.js');

Object.defineProperty(exports, 'API', {
  enumerable: true,
  get: function () {
    return _API.API;
  }
});
},{"./API.js":55}],54:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Auth = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _API = require('../API');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthService = function () {
  function AuthService() {
    _classCallCheck(this, AuthService);

    this.cache = {
      tags: [],
      ingredients: []
    };
  }

  /**
   * Returns promise for user login success
   * @param username
   * @param password
   * @returns {*|Promise|{name, url, component, navigateOnSuccessToRoute, routes}}
   */


  _createClass(AuthService, [{
    key: 'login',
    value: function login(username, password) {
      return _API.API.login({
        username: username,
        password: password
      });
    }

    /**
     * Logs current user out
     */

  }, {
    key: 'logout',
    value: function logout() {
      _API.API.logout();
    }

    /**
     * Returns promise for user creation success
     * @param username
     * @param password
     * @param password_repeat
     * @param email
     * @param store_id
     * @param store_password
     * @returns {Promise<any>}
     */

  }, {
    key: 'register',
    value: function register(username, password, password_repeat, email, store_id, store_password) {
      return _API.API.createUser({
        username: username,
        password: password,
        password_repeat: password_repeat,
        email: email,
        store_id: store_id,
        store_password: store_password
      }).catch(function (rejection) {
        return Promise.reject(rejection);
      }); // .then(result => result).catch(rejection => Promise.reject(rejection));
    }

    /**
     * Returns promise for a store list object
     * @returns {*|Promise<{success: boolean, list: *[]}>}
     */

  }, {
    key: 'getStoreList',
    value: function getStoreList() {
      return _API.API.getStoreList();
    }

    /**
     * Returns promise for and array of ingredient objects
     * @returns {Promise}
     */

  }, {
    key: 'getIngredients',
    value: function getIngredients() {
      var _this = this;

      if (this.cache.ingredients.length === 0) {
        return _API.API.getIngredientList().then(function (data) {
          return _this.cache.ingredients = data.results;
        }).catch(function (rejection) {
          return [];
        });
      }
      return Promise.resolve(this.cache.ingredients);
    }

    /**
     * Returns promise for an array of tag objects
     * @returns {Promise}
     */

  }, {
    key: 'getTags',
    value: function getTags() {
      var _this2 = this;

      if (this.cache.tags.length === 0) {
        return _API.API.getTagList().then(function (data) {
          return _this2.cache.tags = data.results;
        }).catch(function (rejection) {
          return [];
        });
      }
      return Promise.resolve(this.cache.tags);
    }

    /**
     * Returns authorization status
     * @returns {boolean}
     */

  }, {
    key: 'isAuthorized',
    value: function isAuthorized() {
      return !!_API.API._getToken();
    }
  }]);

  return AuthService;
}();

var Auth = exports.Auth = new AuthService();
},{"../API":50}],49:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Auth = require('./Auth.js');

Object.defineProperty(exports, 'Auth', {
  enumerable: true,
  get: function () {
    return _Auth.Auth;
  }
});
},{"./Auth.js":54}],30:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('../../Component');

var _Component3 = _interopRequireDefault(_Component2);

var _dom = require('../../utils/dom.js');

var dom = _interopRequireWildcard(_dom);

var _object = require('../../utils/object.js');

var Obj = _interopRequireWildcard(_object);

var _url = require('../../utils/url.js');

var Url = _interopRequireWildcard(_url);

var _Auth = require('../../services/Auth');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing app router.
 */
var Router = function (_Component) {
  _inherits(Router, _Component);

  function Router(props) {
    _classCallCheck(this, Router);

    var _this = _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this, props));

    _this.state = {
      routes: props.routes,
      defaultRoute: props.defaultRoute,
      currentRoute: null,
      currentPath: null,
      previousRoute: null,
      previousRestrictedRoute: null,
      activeComponent: null
    };
    _this.layoutManager = props.layoutManager;
    console.log('Router:');
    console.log(props);
    dom.bindHandlers(_this, 'handleUrlChange', 'navigateToUrl', 'navigateToRoute');
    if (!_this.path) {
      _this.navigateToRoute('home');
    }
    window.addEventListener('hashchange', function () {
      _this.handleUrlChange(_this.path);
    });
    _this.handleUrlChange(_this.path);
    return _this;
  }

  /**
   * Returns hashed path
   * @returns {string}
   */


  _createClass(Router, [{
    key: 'handleUrlChange',


    /**
     * Handles url change
     * @param {string} path
     */
    value: function handleUrlChange(path) {
      var _this2 = this;

      var _state = this.state,
          routes = _state.routes,
          currentRoute = _state.currentRoute,
          currentPath = _state.currentPath;

      console.log('Router handleUrlChange:');
      /* console.log(this.props);
      console.log(this.state); */
      console.log(routes);

      var nextRoute = Obj.find(routes, function (_ref) {
        var url = _ref.url;
        return Url.isMatchingPath(url, path);
      });
      if (!nextRoute) nextRoute = this.state.routes[this.state.defaultRoute];
      console.log(nextRoute);
      if (!!nextRoute && (nextRoute !== currentRoute || currentPath !== path)) {
        if (nextRoute.onEnter) {
          this.handleOnEnter(nextRoute);
        }
        if (nextRoute.redirectToRoute) {
          this.navigateToRoute(nextRoute.redirectToRoute);
          return;
        }
        if (nextRoute.redirectUnauthorizedToRoute && !_Auth.Auth.isAuthorized()) {
          this.navigateToRoute(nextRoute.redirectUnauthorizedToRoute);
          return;
        }
        if (nextRoute.redirectAuthorizedToRoute && _Auth.Auth.isAuthorized()) {
          this.navigateToRoute(nextRoute.redirectAuthorizedToRoute);
          return;
        }
        console.log(nextRoute);
        var params = Url.extractUrlParams(nextRoute.url, path);
        if (nextRoute.navigateOnSuccessToRoute) {
          nextRoute.navigateOnSuccessToMethod = this.navigateToRoute;
        }
        if (nextRoute.routes && Array.isArray(nextRoute.routes)) nextRoute.routes = nextRoute.routes.reduce(function (accum, routeName) {
          accum[routeName] = {
            name: _this2.state.routes[routeName].name,
            url: _this2.state.routes[routeName].url
          };
          return accum;
        }, {});

        var activeComponent = new nextRoute.component({
          host: this.host,
          routeProps: nextRoute,
          params: params
        });

        if (nextRoute.layout) {
          this.layoutManager.updateState({
            mainComponent: activeComponent
          });
        }

        this.updateState({
          activeComponent: activeComponent,
          currentRoute: nextRoute,
          currentPath: path
        });
      }
    }

    /**
     * Navigate to a given url
     * @param {string} url
     */

  }, {
    key: 'navigateToUrl',
    value: function navigateToUrl(url) {
      window.location.hash = url;
    }

    /**
     * Navigate to a given route. Puts past route on history
     * @param {string} routeName name
     * @param {string} message - optional message that target route component may use
     * @param {string} messageClass - optional message class (e.g. alert or success)
     */

  }, {
    key: 'navigateToRoute',
    value: function navigateToRoute(routeName) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var messageClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (this.state.currentRoute) {
        this.state.previousRoute = this.state.currentRoute;
        // next may be used by such features like Login to bring user back to the point he was rejected from
        if (this.state.currentRoute.redirectUnauthorizedToRoute) {
          this.previousRestrictedRoute = this.state.currentRoute;
        }
      }
      this.navigateToUrl(this.state.routes[routeName].url);
    }

    /**
     * Handles on component enter event. E.g. check permissions
     * @param {function} onEnter
     */

  }, {
    key: 'handleOnEnter',
    value: function handleOnEnter(_ref2) {
      var onEnter = _ref2.onEnter;

      onEnter();
    }

    /**
     * Render routing
     * @returns {*|HTMLElement|string}
     */

  }, {
    key: 'render',
    value: function render() {
      console.log(this.name + '.render()', this.state);
      var _state2 = this.state,
          activeComponent = _state2.activeComponent,
          currentRoute = _state2.currentRoute;

      var layoutManager = this.layoutManager;
      /*
      const rendered = currentRoute.layout ? layoutManager.updateState({
        mainComponent: activeComponent,
      }) : activeComponent && activeComponent.render(); */
      var rendered = currentRoute.layout ? layoutManager.render() : activeComponent && activeComponent.render();
      console.log(this.name + '.render() out with', rendered);
      return rendered;
    }
  }, {
    key: 'path',
    get: function get() {
      console.log('Router get path:');
      console.log(window.location.hash.slice(1));
      return window.location.hash.slice(1);
    }
  }]);

  return Router;
}(_Component3.default);

exports.default = Router;
},{"../../Component":48,"../../utils/dom.js":39,"../../utils/object.js":40,"../../utils/url.js":41,"../../services/Auth":49}],21:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Router = require('./Router.js');

var _Router2 = _interopRequireDefault(_Router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Router2.default;
},{"./Router.js":30}],42:[function(require,module,exports) {

},{"./..\\..\\assets\\logo\\PizzaTime-72x45.png":[["PizzaTime-72x45.caaa6b5a.png",47],47]}],31:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('../../Component');

var _Component3 = _interopRequireDefault(_Component2);

var _dom = require('../../utils/dom.js');

var dom = _interopRequireWildcard(_dom);

require('./style.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing page layout.
 */
var Layout = function (_Component) {
  _inherits(Layout, _Component);

  function Layout(props) {
    _classCallCheck(this, Layout);

    var _this = _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this, props));

    _this.prerendered = _this.preRender();
    console.log('Layout: ', _this.props);
    return _this;
  }

  _createClass(Layout, [{
    key: 'updateChildrenState',
    value: function updateChildrenState() {
      console.log(this.name + '.updateChildrenState() in having this.state.mainComponent', this.state.mainComponent);
      this.state.mainComponent.host = this.prerendered.main;
      this.state.mainComponent.updateState();
      console.log(this.name + '.updateChildrenState() out returning nothing');
    }

    /**
     * Renders component view.
     * @returns {HTMLElement}
     */

  }, {
    key: 'render',
    value: function render() {
      return this.prerendered.fragment;
    }

    /**
     * PreRenders component view.
     * @returns {object} {fragment, elements...}
     */

  }, {
    key: 'preRender',
    value: function preRender() {
      var _this2 = this;

      console.log(this.name + '.preRender() in having ', this.state);
      var prerendered = {};
      var container = dom.createElement({
        tag: 'div',
        id: 'layout-container',
        classList: ['column']
      });

      var mainSection = dom.createElement({
        tag: 'main',
        id: 'layout-main'
        // classList: ['shaded-content-container', 'column'],
      });

      prerendered.main = mainSection;

      dom.setChildren(container, [dom.createElement({
        tag: 'header',
        innerHTML: '<div class="layout-optimal-width-container layout-row layout-header">\n          <div id="layout-logo" class="layout-abs-center" title="Pizza Line logo"></div>\n          <time id="layout-current-time" class="layout-clock" datetime="2018-01-31 00:00">00:00:00</time>\n          <div id="layout-signout">\n              <a href="#/logout" class="layout-logout">\n                  <i class="fas fa-user-secret"></i>\n                  Sign Out\n              </a>\n          </div>\n        </div>'
      }), mainSection, dom.createElement({
        tag: 'footer',
        innerHTML: '<div>\n              <address class="layout-row"><div id="office-address">Kottans, Kottans Str.1</div>\n                  <div>tel: <a href="tel:57778887">577-788-87</a></div>\n              </address>\n          </div>\n          <div class="layout-row" id="copyright">\n              <div>Pizza Manager</div> <div>&copy; <span id="copy-year">2018</span></div>\n          </div>'
      })], function (node) {
        console.log(_this2.name + '.preRender() has formed ', container, 'receiving', node);
      });
      prerendered.fragment = container;
      console.log(this.name + '.preRender() out with ', prerendered);
      return prerendered;
    }
  }]);

  return Layout;
}(_Component3.default);

exports.default = Layout;
},{"../../Component":48,"../../utils/dom.js":39,"./style.css":42}],22:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Layout = require('./Layout.js');

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Layout2.default;
},{"./Layout.js":31}],32:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('../../Component');

var _Component3 = _interopRequireDefault(_Component2);

var _dom = require('../../utils/dom.js');

var dom = _interopRequireWildcard(_dom);

var _Auth = require('../../services/Auth');

require('./style.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing user login.
 */
var Login = function (_Component) {
  _inherits(Login, _Component);

  function Login(props) {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

    dom.bindHandlers(_this, 'handleSubmitAction');
    console.log('Login: ', _this.props);
    return _this;
  }

  /**
   * Renders component view.
   * @returns {HTMLElement}
   */


  _createClass(Login, [{
    key: 'render',
    value: function render() {
      var container = dom.createElement({
        tag: 'div',
        id: 'login-container',
        classList: ['shaded-content-container', 'column']
      });
      container.addEventListener('submit', this.handleSubmitAction);
      container.innerHTML = '<h2>Login</h2>\n    <div id="login-result"></div>\n    <form id="login-form" method="POST" target="#/login">\n      <div>\n        <input required type="text" id="login-username" name="login-username" \n            minlength="2" maxlength="24" inputmode="verbatim" placeholder="User name" title="Type your user name in" />\n        <label for="login-username" class="validity"></label>\n      </div>\n      <div>\n        <input required type="password" id="login-password" name="login-password" \n            minlength="8" maxlength="32" inputmode="verbatim" placeholder="Password" title="Type your password in" />\n        <label for="login-password" class="validity"></label>\n      </div>\n      <button type="submit" id="login-submit">Sign in!</button>\n    </form>\n    <a href="#' + this.props.routeProps.routes.register.url + '">' + this.props.routeProps.routes.register.name + '</a>\n    <a href="#/' + (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)) + '">Random link</a>\n    ';
      return container;
    }

    /**
     * Handles credentials submission.
     * @param {Event} ev
     */

  }, {
    key: 'handleSubmitAction',
    value: function handleSubmitAction(ev) {
      var _this2 = this;

      ev.preventDefault();
      var username = void 0,
          password = void 0;
      var _ref = [ev.target.elements['login-username'].value.trim(), ev.target.elements['login-password'].value.trim()];
      username = _ref[0];
      password = _ref[1];

      _Auth.Auth.login(username, password).then(function (loginResult) {
        _this2.resultMessage('Logged in successfully');
        if (_this2.props.routeProps.navigateOnSuccessToMethod) {
          setTimeout(function () {
            _this2.props.routeProps.navigateOnSuccessToMethod(_this2.props.routeProps.navigateOnSuccessToRoute);
          }, 1500);
        }
      }).catch(function (rejection) {
        _this2.resultMessage(rejection.error, 'error');
        // clean up inputs and focus on username input
        var els = ['login-username', 'login-password'].map(function (elId) {
          return document.getElementById(elId);
        });
        els.forEach(function (el) {
          return el.value = '';
        });
        els[0].focus();
      });
    }

    /**
     * Shows error or success message
     * @param {string} message
     * @param {string} type
     */

  }, {
    key: 'resultMessage',
    value: function resultMessage() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'success';

      var classToAdd = 'login-' + type;
      var classToRemove = 'login-' + (type === 'success' ? 'error' : 'success');
      var resultMessageElement = document.getElementById('login-result');
      resultMessageElement.classList.remove(classToRemove);
      resultMessageElement.classList.add(classToAdd);
      resultMessageElement.innerHTML = message;
    }
  }]);

  return Login;
}(_Component3.default);

exports.default = Login;
},{"../../Component":48,"../../utils/dom.js":39,"../../services/Auth":49,"./style.css":42}],23:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Login = require('./Login.js');

var _Login2 = _interopRequireDefault(_Login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Login2.default;
},{"./Login.js":32}],33:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('../../Component');

var _Component3 = _interopRequireDefault(_Component2);

var _dom = require('../../utils/dom.js');

var dom = _interopRequireWildcard(_dom);

var _Auth = require('../../services/Auth');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing user logout.
 */
var Logout = function (_Component) {
  _inherits(Logout, _Component);

  function Logout(props) {
    _classCallCheck(this, Logout);

    var _this = _possibleConstructorReturn(this, (Logout.__proto__ || Object.getPrototypeOf(Logout)).call(this, props));

    dom.bindHandlers(_this, 'handleLogoutAction');
    return _this;
  }

  /**
   * Renders component view.
   * @returns {HTMLElement|string}
   */


  _createClass(Logout, [{
    key: 'render',
    value: function render() {
      this.handleLogoutAction();
      return '';
      /*
      const container = dom.createElement({
        tag: 'div',
        id: 'logout-container',
      });
      container.addEventListener('click', this.handleLogoutAction);
      container.innerHTML = `<a href="#/logout">Sign out</a>`;
      return container; */
    }

    /**
     * Handles logout user action.
     * @param {Event} ev
     */

  }, {
    key: 'handleLogoutAction',
    value: function handleLogoutAction() {
      var ev = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      ev && ev.preventDefault();
      _Auth.Auth.logout();
      if (this.props.routeProps.navigateOnSuccessToMethod) {
        this.props.routeProps.navigateOnSuccessToMethod(this.props.routeProps.navigateOnSuccessToRoute);
      }
    }
  }]);

  return Logout;
}(_Component3.default);

exports.default = Logout;
},{"../../Component":48,"../../utils/dom.js":39,"../../services/Auth":49}],24:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Logout = require('./Logout.js');

var _Logout2 = _interopRequireDefault(_Logout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Logout2.default;
},{"./Logout.js":33}],34:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('../../Component');

var _Component3 = _interopRequireDefault(_Component2);

var _dom = require('../../utils/dom.js');

var dom = _interopRequireWildcard(_dom);

require('./style.css');

var _Auth = require('../../services/Auth');

var _API = require('../../services/API');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing user registration.
 */
var Register = function (_Component) {
  _inherits(Register, _Component);

  function Register(props) {
    _classCallCheck(this, Register);

    var _this = _possibleConstructorReturn(this, (Register.__proto__ || Object.getPrototypeOf(Register)).call(this, props));

    dom.bindHandlers(_this, 'handleDefaultSubmitAction', 'handleRealSubmitAction', 'handlePasswordsMatch', 'handleRealSubmitAction');
    console.log('Register', _this.props);
    return _this;
  }

  /**
   * Renders component view
   * @returns {HTMLElement}
   */


  _createClass(Register, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var container = dom.createElement({
        tag: 'div',
        id: 'register-container',
        classList: ['shaded-content-container', 'column']
      });
      container.addEventListener('submit', this.handleDefaultSubmitAction);
      dom.setChildren(container, '<h2>Register</h2>\n    <div id="register-result"></div>\n    <form id="register-form" method="POST" target="#/login">\n      <div>\n        <input required type="text" id="register-username" name="register-username" \n            minlength="2" maxlength="24" inputmode="verbatim" placeholder="User name" title="Type your user name in" />\n        <label for="register-username" class="validity"></label>\n      </div>\n      <div>\n        <input required type="password" id="register-password1" name="register-password1" \n            minlength="8" maxlength="32" inputmode="verbatim" placeholder="Password" title="Type your password in" />\n        <label for="register-password1" class="validity"></label>\n      </div>\n      <div>\n        <input required type="password" id="register-password2" name="register-password2" \n            minlength="6" maxlength="32" inputmode="verbatim" placeholder="Password once again" title="Type your password in once again" />\n        <label for="register-password2" class="validity"></label>\n      </div>\n      <div>\n        <input required type="email" id="register-email" name="register-email" \n            minlength="8" maxlength="32" inputmode="email" placeholder="E-mail" title="Type your e-mail in" />\n        <label for="register-email" class="validity"></label>\n      </div>\n      <div id="register-store">\n        <label for="register-store_id"><strong>Store:</strong> </label>\n        <SELECT required id="register-store_id">\n        </SELECT>\n      </div>\n      <div>\n        <input required type="password" id="register-store_password" name="register-store_password" \n            minlength="8" maxlength="32" inputmode="verbatim" placeholder="Store password" title="Type password for selected store" />\n        <label for="register-store_password" class="validity"></label>\n      </div>\n      <button type="button" class="real-submit" id="register-real-submit" disabled>Sign up!</button>\n      <button type="submit" class="register-hidden" id="register-default-submit">You should not see me</button>\n    </form>\n    <div>Have already got an account?</div>\n    <a href="#' + this.props.routeProps.routes.login.url + '">' + this.props.routeProps.routes.login.name + '</a>\n    <hr/>\n    <a href="#/' + (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)) + '">Random link</a>\n    ', function (node) {
        document.getElementById('register-username').addEventListener('input', _this2.handleDefaultSubmitAction);
        document.getElementById('register-email').addEventListener('input', _this2.handleDefaultSubmitAction);
        document.getElementById('register-store_password').addEventListener('input', _this2.handleDefaultSubmitAction);
        document.getElementById('register-password1').addEventListener('input', _this2.handleDefaultSubmitAction);
        document.getElementById('register-password2').addEventListener('input', _this2.handleDefaultSubmitAction);

        document.getElementById('register-password1').addEventListener('input', _this2.handlePasswordsMatch);
        document.getElementById('register-password2').addEventListener('input', _this2.handlePasswordsMatch);
        document.getElementById('register-real-submit').addEventListener('click', _this2.handleRealSubmitAction);
        var storeSelectElement = document.getElementById('register-store_id');
        _Auth.Auth.getStoreList().then(function (result) {
          _this2.resultMessage(); // clean up result state
          result.list.sort(function (a, b) {
            return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
          }).forEach(function (item) {
            var option = document.createElement('option');
            option.text = item.name;
            option.value = item.id;
            storeSelectElement.options.add(option);
          });
        }).catch(function (rejection) {
          if (rejection.serverError) {
            var errorUIelement = document.getElementById('register-store');
            errorUIelement.classList.add('alert');
            errorUIelement.innerHTML = '<p>Pizza server may be down or API has changed.</p> \n              <p>Please, <a href="' + window.location + '">try again later</a> or</p>\n              <p>contact pizza server admin at <a href="' + _API.API.APIOwner + '">' + _API.API.APIOwner + '</a>.</p>\n              <p>Server responded: ' + rejection.error + '</p>';
          } else {
            _this2.resultMessage(rejection.error, 'error');
          }
        });
      });
      // console.log('Register.render()');
      // console.log(container);
      return container;
    }

    /**
     * Handles default form submission to activate native validations
     * @param {Event} ev
     */

  }, {
    key: 'handleDefaultSubmitAction',
    value: function handleDefaultSubmitAction(ev) {
      ev.preventDefault();
      var enableSubmission = document.getElementById('register-form').checkValidity();
      if (document.getElementById('register-password1').value !== document.getElementById('register-password2').value) {
        enableSubmission = false;
      }
      var submitButton = document.getElementById('register-real-submit');
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

  }, {
    key: 'handlePasswordsMatch',
    value: function handlePasswordsMatch(ev) {
      var pwd1 = document.getElementById('register-password1');
      var pwd2 = document.getElementById('register-password2');
      if (pwd2.value.length) {
        pwd2.setCustomValidity(pwd1.value === pwd2.value ? "" : "Both passwords should match");
        document.getElementById('register-default-submit').click();
      }
    }

    /**
     * Handles registration submission
     * @param {Event} ev
     */

  }, {
    key: 'handleRealSubmitAction',
    value: function handleRealSubmitAction(ev) {
      var _this3 = this;

      ev.preventDefault();
      if (!document.getElementById('register-form').reportValidity()) return;
      var fields = {};
      ['register-username', 'register-password1', 'register-password2', 'register-email', 'register-store_id', 'register-store_password'].forEach(function (name) {
        fields[name.split('-').slice(1).join('-')] = document.getElementById(name).value.trim();
      });
      fields.store_id = parseInt(fields.store_id);

      console.log(this.name + ': Submit action invoked with credentials: ', fields);

      _Auth.Auth.register(fields.username, fields.password1, fields.password2, fields.email, fields.store_id, fields.store_password).then(function (registerResult) {
        _this3.resultMessage('Registered successfully');
        console.log('Register.handleRealSubmitAction() registered OK', _this3.props);
        if (_this3.props.routeProps.navigateOnSuccessToMethod) {
          setTimeout(function () {
            _this3.props.routeProps.navigateOnSuccessToMethod(_this3.props.routeProps.navigateOnSuccessToRoute, 'Registered successfully', 'success');
          }, 1500);
        }
      }).catch(function (rejection) {
        console.log('Register.handleSubmitAction() rejected: ', rejection);
        _this3.resultMessage(rejection.error + (rejection.validations ? '<div>' + rejection.validations.join('</div><div>') + '</div>' : ''), 'error');
        // clean up inputs and focus on username input
        var els = ['register-username', 'register-password1', 'register-password2', 'register-email', 'register-store_password'].map(function (elId) {
          return document.getElementById(elId);
        });
        els.forEach(function (el) {
          return el.value = '';
        });
        els[0].focus();
      });
    }

    /**
     * Shows error or success message
     * @param {string} message
     * @param {string} type
     */

  }, {
    key: 'resultMessage',
    value: function resultMessage() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'success';

      var classToAdd = 'register-' + type;
      var classToRemove = 'register-' + (type === 'success' ? 'error' : 'success');
      var resultMessageElement = document.getElementById('register-result');
      resultMessageElement.classList.remove(classToRemove);
      resultMessageElement.classList.add(classToAdd);
      resultMessageElement.innerHTML = message;
    }
  }]);

  return Register;
}(_Component3.default);

exports.default = Register;
},{"../../Component":48,"../../utils/dom.js":39,"./style.css":42,"../../services/Auth":49,"../../services/API":50}],25:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Register = require('./Register.js');

var _Register2 = _interopRequireDefault(_Register);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Register2.default;
},{"./Register.js":34}],35:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('../../Component');

var _Component3 = _interopRequireDefault(_Component2);

var _dom = require('../../utils/dom.js');

var dom = _interopRequireWildcard(_dom);

var _object = require('../../utils/object.js');

var Obj = _interopRequireWildcard(_object);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing app secret page.
 */
var Secret = function (_Component) {
  _inherits(Secret, _Component);

  function Secret(props) {
    _classCallCheck(this, Secret);

    var _this = _possibleConstructorReturn(this, (Secret.__proto__ || Object.getPrototypeOf(Secret)).call(this, props));

    console.log(_this.name);
    console.log(_this.props);
    return _this;
  }

  /**
   * Renders component view
   * @returns {HTMLElement}
   */


  _createClass(Secret, [{
    key: 'render',
    value: function render() {
      var container = dom.createElement({
        tag: 'div',
        id: 'secret-container',
        classList: ['shaded-content-container', 'column']
      });

      var links = Obj.map(this.props.routeProps.routes, function (_ref, routeName) {
        var url = _ref.url,
            name = _ref.name;

        if (url.search(':id') >= 0) {
          url = url.replace(':id', Math.floor(Math.random() * 100) + 1);
        }
        return '<a href="#' + url + '">' + name + '</a>';
      });

      container.innerHTML = '<h2>Secret place</h2>' + '<p>Kinda 404, you know...</p>' + '<p>You do not belong here! Navigate away!</p>' + '<div>' + links.join('</div><div>') + '</div>';
      return container;
    }
  }]);

  return Secret;
}(_Component3.default);

exports.default = Secret;
},{"../../Component":48,"../../utils/dom.js":39,"../../utils/object.js":40}],26:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Secret = require('./Secret.js');

var _Secret2 = _interopRequireDefault(_Secret);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Secret2.default;
},{"./Secret.js":35}],38:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('../../Component');

var _Component3 = _interopRequireDefault(_Component2);

var _dom = require('../../utils/dom.js');

var dom = _interopRequireWildcard(_dom);

var _object = require('../../utils/object');

var Obj = _interopRequireWildcard(_object);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing particular order.
 */
var Order = function (_Component) {
  _inherits(Order, _Component);

  function Order(props) {
    _classCallCheck(this, Order);

    var _this = _possibleConstructorReturn(this, (Order.__proto__ || Object.getPrototypeOf(Order)).call(this, props));

    _this.state = {
      id: _this.props.params.id
    };
    return _this;
  }

  _createClass(Order, [{
    key: 'render',
    value: function render() {
      var container = dom.createElement({
        tag: 'div',
        id: 'order-container',
        classList: ['shaded-content-container', 'column']
      });

      container.innerHTML = '<h2>Order #' + this.state.id + '</h2>\n      <a href="#/order/' + (Math.floor(Math.random() * 100) + 1) + '">Random order</a>\n      <hr/>\n      <a href="#/">Home</a>\n      <a href="#/' + (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)) + '">Random link</a>';
      return container;
    }
  }]);

  return Order;
}(_Component3.default);

exports.default = Order;
},{"../../Component":48,"../../utils/dom.js":39,"../../utils/object":40}],28:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Order = require('./Order.js');

var _Order2 = _interopRequireDefault(_Order);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Order2.default;
},{"./Order.js":38}],36:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('../../Component');

var _Component3 = _interopRequireDefault(_Component2);

var _dom = require('../../utils/dom.js');

var dom = _interopRequireWildcard(_dom);

require('./style.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing orders list.
 */
var Orders = function (_Component) {
  _inherits(Orders, _Component);

  function Orders(props) {
    _classCallCheck(this, Orders);

    var _this = _possibleConstructorReturn(this, (Orders.__proto__ || Object.getPrototypeOf(Orders)).call(this, props));

    _this.state = {
      id: props.id
    };
    return _this;
  }

  _createClass(Orders, [{
    key: 'render',
    value: function render() {
      console.log(this.name + '.render() in having this.host', this.host);
      var container = dom.createElement({
        tag: 'div',
        id: 'orders-container',
        classList: ['column']
      });

      container.innerHTML = '\n      <a href="#/add" class="orders-addpizza"><i class="fas fa-plus"></i></a>\n      <h2>No pizzas yet in the queue. Add one by clicking (+) below</h2>\n      <!-- h2>Current orders</h2>\n      <div>cccccc</div>\n      <div>cccccc</div>\n      <div>cccccc</div>\n      <div>cccccc</div>\n      <div>cccccc</div>\n      <div>cccccc</div>\n      <div>cccccc</div>\n      <div>cccccc</div>\n      <div>cccccc</div>\n      <div>cccccc</div>\n      <div>cccccc</div>\n      <div>cccccc</div>\n      <div>cccccc</div>\n      <div>cc1cccc</div>\n      <div>cc2cccc</div>\n      <div>cc3cccc</div>\n      <div>ccc4ccc</div>\n      <div>cccc5cc</div>\n      <div>ccccc6c</div>\n      <div>cccccc7</div>\n      <div>cc8cccc</div>\n      <div>ccc9ccc</div>\n      <div>cccccca</div>\n      <div>ccccccb</div>\n      <div>ccccccc</div>\n      <div>ccccccd</div>\n      <div>cccccce</div>\n      <div>ccccccf</div>\n      <div>ccccccg</div>\n      <div>cccccch</div>\n      <div>cccccci</div>\n      <div>ccccccj</div>\n      <div>cccccck</div>\n      <div>ccccccl</div>\n      <div>ccccccm</div>\n      <div>ccccccn</div>\n      <div>cccccco</div>\n      <div>ccccccp</div>\n      <div>ccccccq</div>\n      <div>ccccccr</div>\n      <div>ccccccs</div>\n      <div>cccccct</div>\n      <div>ccccccu</div>\n      <div>ccccccv</div>\n      <div>ccccccw</div>\n      <div>ccccccx</div>\n      <div>ccccccy</div>\n      <div>ccccccz</div>\n      <div>cccccczz</div>\n      <div>ccccccz2</div>\n      <div>ccccccz3</div>\n      <div>cc1cccc</div>\n      <div>cc2cccc</div>\n      <div>cc3cccc</div>\n      <div>ccc4ccc</div>\n      <div>cccc5cc</div>\n      <div>ccccc6c</div>\n      <div>cccccc7</div>\n      <div>cc8cccc</div>\n      <div>ccc9ccc</div>\n      <div>cccccca</div>\n      <div>ccccccb</div>\n      <div>ccccccc</div>\n      <div>ccccccd</div>\n      <div>cccccce</div>\n      <div>ccccccf</div>\n      <div>ccccccg</div>\n      <div>cccccch</div>\n      <div>cccccci</div>\n      <div>ccccccj</div>\n      <div>cccccck</div>\n      <div>ccccccl</div>\n      <div>ccccccm</div>\n      <div>ccccccn</div>\n      <div>cccccco</div>\n      <div>ccccccp</div>\n      <div>ccccccq</div>\n      <div>ccccccr</div>\n      <div>ccccccs</div>\n      <div>cccccct</div>\n      <div>ccccccu</div>\n      <div>ccccccv</div>\n      <div>ccccccw</div>\n      <div>ccccccx</div>\n      <div>ccccccy</div>\n      <div>ccccccz</div>\n      <div>cccccczz</div>\n      <div>ccccccz2</div>\n      <div>ccccccz3</div -->\n      <a href="#/order/' + (Math.floor(Math.random() * 100) + 1) + '">Random order</a>\n      <hr/>\n      <a href="#/">Home</a>\n      <a href="#/' + (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)) + '">Random link</a>';
      console.log(this.name + '.render() out returning', container);
      return container;
    }
  }]);

  return Orders;
}(_Component3.default);

exports.default = Orders;
},{"../../Component":48,"../../utils/dom.js":39,"./style.css":42}],27:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Orders = require('./Orders.js');

var _Orders2 = _interopRequireDefault(_Orders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Orders2.default;
},{"./Orders.js":36}],56:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('../../Component');

var _Component3 = _interopRequireDefault(_Component2);

var _dom = require('../../utils/dom.js');

var dom = _interopRequireWildcard(_dom);

var _Auth = require('../../services/Auth');

require('./style.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PIZZA_SIZES = [30, 45, 60];

/**
 * Class representing pizza constructor.
 */

var PizzaParams = function (_Component) {
  _inherits(PizzaParams, _Component);

  function PizzaParams(props) {
    _classCallCheck(this, PizzaParams);

    var _this = _possibleConstructorReturn(this, (PizzaParams.__proto__ || Object.getPrototypeOf(PizzaParams)).call(this, props));

    console.log('PizzaParams constructor; state', _this.state);
    dom.bindHandlers(_this, 'handleUserAction', 'handleSubmit');
    _this.prerendered = _this.preRender();
    return _this;
  }

  /**
   * Supplies state to caller's context
   */


  _createClass(PizzaParams, [{
    key: 'handleUserAction',
    value: function handleUserAction(ev) {
      console.log(this.name + '.onUserAction() in with event', ev, 'and state', this.state);
      var trackedParams = ['pizza-size', 'pizza-ingredient']; // , 'pizza-tag'];
      var target = ev.target;
      var doUpdate = false;
      if (trackedParams.includes(target.name)) {
        console.log(this.name + '.onUserAction() event on tracked item', target);
        switch (target.name) {
          case 'pizza-size':
            this.state.size = parseInt(target.value);break;
          case 'pizza-ingredient':
            if (target.checked) {
              this.state.ingredients[target.value] = target.value;
            } else {
              delete this.state.ingredients[target.value];
            }
            break;
          /* case 'pizza-tag':
            if (target.checked) {
              this.state.tags[target.value] = target.value;
            } else {
              delete this.state.tags[target.value];
            }
            break; */
        }
        doUpdate = true;
      }

      console.log(this.name + '.onUserAction() about to out with state', this.state);
      if (doUpdate) {
        this.props.onParamsChange(this.state);
      }
    }

    /**
     * Manages submit action
     */

  }, {
    key: 'handleSubmit',
    value: function handleSubmit(ev) {
      ev.preventDefault();
      console.log(this.name + '.onSubmit()', ev, 'and state', this.state);
    }

    /**
     * Render view
     * @returns {HTMLElement}
     */

  }, {
    key: 'render',
    value: function render() {
      return this.prerendered.fragment;
    }

    /**
     * PreRenders component view.
     * @returns {object} {fragment, elements...}
     */

  }, {
    key: 'preRender',
    value: function preRender() {
      var _this2 = this;

      console.log(this.name + '.preRender() in having ', this.state);
      var container = dom.createElement({
        tag: 'form',
        id: 'pizzaConstructor-container',
        classList: ['pizzaParams-container']
      });

      container.addEventListener('change', this.handleUserAction);
      container.addEventListener('submit', this.handleSubmit);

      var checkedSizeValue = this._getPizzaSizeCheckedArray();
      var pizzaSizeRadios = '<fieldset><legend>Size</legend>' + PIZZA_SIZES.reduce(function (html, size, idx) {
        return html + ('\n      <input type="radio" id="pizza-size-' + idx + '" name="pizza-size" value="' + size + '"' + checkedSizeValue[size] + '>\n      <label for="pizza-size-' + idx + '">' + size + '</label>\n    ');
      }, '') + '</fieldset>';
      container.innerHTML = '<input required type="text" id="pizza-name" value="' + this.state.name + '" placeholder="Pizza order name">' + '<textarea id="pizza-description" placeholder="Pizza description">' + this.state.description + '</textarea>' + pizzaSizeRadios;
      var sets = ['ingredient', 'tag'];
      Promise.all([_Auth.Auth.getIngredients(), _Auth.Auth.getTags()]).then(function (list) {
        console.log(_this2.name + '.preRender()', list);

        var _loop = function _loop(i) {
          var el = dom.createElement('fieldset');
          el.innerHTML = '<legend>' + sets[i] + '</legend>' + list[i].reduce(function (html, item) {
            return html + ('<input type="checkbox" id="pizza-' + sets[i] + '-' + item.id + '" name="pizza-' + sets[i] + '" value="' + item.name + '">\n            <label for="pizza-' + sets[i] + '-' + item.id + '">' + item.description + '</label>');
          }, '');
          container.appendChild(el);
        };

        for (var i = 0; i < 2; ++i) {
          _loop(i);
        }
        container.appendChild(dom.createElement({
          tag: 'button',
          // attr: {type: 'button'},
          innerHTML: 'Submit'
        }));
        container.appendChild(dom.createElement({
          tag: 'button',
          attr: { type: 'button' },
          innerHTML: 'Cancel',
          classList: 'alert-background'
        }));
      });

      /* const canvas = dom.createElement('canvas');
      const params = dom.createElement('div');
        dom.setChildren(container, [ canvas, params ]); */

      return {
        fragment: container
      };
    }

    /**
     * Returns array of checked state per each size
     * @returns {Array}
     * @private
     */

  }, {
    key: '_getPizzaSizeCheckedArray',
    value: function _getPizzaSizeCheckedArray() {
      var checkedSize = [];
      for (var i = PIZZA_SIZES.length - 1; i >= 0; --i) {
        checkedSize[PIZZA_SIZES[i]] = '';
      }
      checkedSize[this.state.size] = ' CHECKED';
      return checkedSize;
    }
  }]);

  return PizzaParams;
}(_Component3.default);

exports.default = PizzaParams;
},{"../../Component":48,"../../utils/dom.js":39,"../../services/Auth":49,"./style.css":42}],51:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PizzaParams = require('./PizzaParams.js');

var _PizzaParams2 = _interopRequireDefault(_PizzaParams);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PizzaParams2.default;
},{"./PizzaParams.js":56}],62:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PizzaImagery = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _API = require('../API');

var _Auth = require('../Auth');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Supplies pizza-related images
 */
var PizzaImageryService = function () {
  function PizzaImageryService() {
    var _this = this;

    _classCallCheck(this, PizzaImageryService);

    this.images = {};
    console.log('PizzaImageryService constructor');
    this.loadIngredients().then(function (data) {
      data.push({
        name: 'pizza',
        url: 'static/images/pizza.png'
      });
      return data;
    }).then(function (list) {
      console.log('PizzaImageryService constructor', list);
      list.forEach(function (item) {
        var image = new Image();
        image.crossOrigin = '';
        image.src = _API.API.prependAssetUrl(item.url);
        _this.images[item.name] = Promise.resolve(image);
      });
      console.log('PizzaImageryService constructor images', _this.images);
    }).catch(function (rejection) {
      return console.log('PizzaImageryService.constructor() error', rejection);
    });
  }

  /**
   * Returns cached image
   * @param imageName
   * @returns {Image}
   */


  _createClass(PizzaImageryService, [{
    key: 'getImage',
    value: function getImage(imageName) {
      return this.images[imageName] || Promise.reject('no-data');
    }
  }, {
    key: 'loadIngredients',
    value: function loadIngredients() {
      return _Auth.Auth.getIngredients().then(function (data) {
        return data.map(function (item) {
          return {
            name: item.name,
            url: item.image_url
          };
        });
      }).catch(function (rejection) {
        return console.log('PizzaImageryService.loadIngredients() error', rejection);
      });
    }
  }]);

  return PizzaImageryService;
}();

var PizzaImagery = exports.PizzaImagery = new PizzaImageryService();
},{"../API":50,"../Auth":49}],61:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PizzaImagery = require('./PizzaImagery.js');

Object.defineProperty(exports, 'PizzaImagery', {
  enumerable: true,
  get: function () {
    return _PizzaImagery.PizzaImagery;
  }
});
},{"./PizzaImagery.js":62}],59:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CANVAS = exports.CANVAS = {
  px: {
    width: 320,
    height: 320
  },
  inch: {
    width: 60,
    height: 60
  },
  pxInch: 0, // pixels per inch
  ingredient: {
    width: 20,
    height: 20
  },
  areas: {
    30: {
      maxRadius: 0, // max px radius allowed
      nodes: [], // nodes list of {r, asimuth}...
      maxIngredients: 14 // max ingredients allowed
    },
    45: {
      maxRadius: 0,
      nodes: [],
      maxIngredients: 14
    },
    60: {
      maxRadius: 0,
      nodes: [],
      maxIngredients: 14
    }
  }
};
CANVAS['pxInch'] = Math.floor(CANVAS.px.width / CANVAS.inch.width);
CANVAS.center = {
  x: Math.floor(CANVAS.px.width / 2),
  y: Math.floor(CANVAS.px.height / 2)
};
Object.keys(CANVAS.areas).forEach(function (r) {
  CANVAS.areas[r].maxRadius = Math.round(r * CANVAS.pxInch / 2 - r / 3 - 5);
});

/* Build nodes (placeholders) for every radius at step 10px
 At r=150 degreeStep=10deg
 At r=5 degreeStep=45deg
 */
var targetR = CANVAS.pxInch * CANVAS.inch.height;
var radii = Object.keys(CANVAS.areas);
var nodes = {
  30: [],
  45: [],
  60: []
};

var _loop = function _loop(r) {
  var itemsOnCircle = Math.floor(Math.PI * 2 * r / (CANVAS.ingredient.width * 1.6));
  var degStep = 360 / itemsOnCircle;

  var _loop2 = function _loop2(deg) {
    var pair = {
      r: r + (-Math.random() * 4 + 3),
      asimuth: deg + (-Math.random() * 15 + 7.5)
    };
    radii.forEach(function (inches) {
      if (CANVAS.areas[inches].maxRadius > r) {
        nodes[inches].push(pair);
      }
    });
  };

  for (var deg = 0; deg < 360; deg += degStep * 0.7) {
    _loop2(deg);
  }
};

for (var r = 10; r < targetR; r += 10) {
  _loop(r);
}

// copy nodes to CANVAS
radii.forEach(function (inches) {
  CANVAS.areas[inches].nodes = nodes[inches];
});

/* For each area distribute nodes evenly across maxIngredients node subsets
   When drawing choose subset wisely.
   Given 12 subsets use those dep on ingredients count:
   1: 0
   2: 0, 6
   3: 0, 4, 8
   4: 0, 3, 6, 9
   5: 0, 2, 5, 7, 10 -- i.e. every round(12/n)
*/
/*
radii.forEach(inches => {
  const maxIngredients = CANVAS.areas[inches].maxIngredients;
  const len = nodes[inches].length;
  const times = Math.ceil(len / maxIngredients);
  for (let i = 0; i < maxIngredients; i++) {
    CANVAS.areas[inches].nodes[i] = [];
    for (let j = 0; j < times; j++) {
      if (j*maxIngredients+i < len) {
        CANVAS.areas[inches].nodes[i].push(nodes[inches][j*maxIngredients+i]);
      }
    }
  }
}); */

/* In the end of the day we draw
   per each .areas[]
   .areas[].maxIngredients ingredients
   each .areas[].ingredientInstancesPerArea times
   at .areas[].nodes[]
   max .areas[].length sprites
 */

// console.log('CANVAS SETTINGS', CANVAS);
},{}],57:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('../../Component');

var _Component3 = _interopRequireDefault(_Component2);

var _PizzaImagery = require('../../services/PizzaImagery');

var _settings = require('./settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing pizza constructed image.
 * host is a <canvas> element
 */
var PizzaCanvas = function (_Component) {
  _inherits(PizzaCanvas, _Component);

  function PizzaCanvas(props) {
    _classCallCheck(this, PizzaCanvas);

    var _this = _possibleConstructorReturn(this, (PizzaCanvas.__proto__ || Object.getPrototypeOf(PizzaCanvas)).call(this, props));

    _this.ctx = _this.host.getContext("2d");

    _this.host.width = _settings.CANVAS.px.width;
    _this.host.height = _settings.CANVAS.px.height;
    return _this;
  }

  /**
   * Render view
   * @returns {HTMLElement|string}
   */


  _createClass(PizzaCanvas, [{
    key: 'render',
    value: function render() {
      this.ctx.clearRect(0, 0, _settings.CANVAS.px.width, _settings.CANVAS.px.height);
      // this.ctx.fillRect(10,10,150,150);
      console.log(this.name + '.render() state', this.state);
      this.drawPizzaBase();
      this.drawIngredients();
      return '';
    }

    /**
     * Draws ingredients
     */

  }, {
    key: 'drawIngredients',
    value: function drawIngredients() {
      var _this2 = this;

      var area = _settings.CANVAS.areas[this.state.size];
      console.log(this.name + '.drawIngredients() area', area);

      var ingredientsCount = Object.keys(this.state.ingredients).length;

      var nodes = this._distributeNodesEvenly(area.nodes, ingredientsCount);

      Object.keys(this.state.ingredients).forEach(function (item, idx) {
        _PizzaImagery.PizzaImagery.getImage(item).then(function (image) {
          var coordSet = nodes[idx];
          for (var i = coordSet.length - 1; i >= 0; i--) {
            var polar = coordSet[i];
            _this2._drawImage(image, polar.r, polar.asimuth, _settings.CANVAS.ingredient.width, _settings.CANVAS.ingredient.height);
          }
        }).catch(function (rejection) {
          return console.log(_this2.name + '.drawIngredients() REJECTED', rejection);
        });
      });
    }

    /**
     * Distributes array of nodes evenly across count groups
     * @param {array} nodes [{r,asimuth}...]
     * @param {number} count
     * @returns {array} [[{r,asimuth}...]...]
     * @private
     */

  }, {
    key: '_distributeNodesEvenly',
    value: function _distributeNodesEvenly(nodes, count) {
      var groupedNodes = [];
      var len = nodes.length;
      var times = Math.ceil(len / count);
      for (var i = 0; i < count; i++) {
        groupedNodes[i] = [];
        for (var j = 0; j < times; j++) {
          if (j * count + i < len) {
            groupedNodes[i].push(nodes[j * count + i]);
          }
        }
      }
      return groupedNodes;
    }

    /**
     * Draws scaled pizza base
     */

  }, {
    key: 'drawPizzaBase',
    value: function drawPizzaBase() {
      var _this3 = this;

      _PizzaImagery.PizzaImagery.getImage('pizza').then(function (image) {
        var pxDimension = _this3.state.size * _settings.CANVAS.pxInch;
        image.width = pxDimension;
        image.height = pxDimension;
        console.log(_this3.name + '.drawPizzaBase()', image);
        _this3._drawImage(image, 0, 0, pxDimension, pxDimension);
        /* const img = new Image(pxDimension, pxDimension);
        img.src = image.src;
        img.onload = () => this.ctx.drawImage(img, 0, 0); */
      }).catch(function (rejection) {
        return console.log(_this3.name + '.drawPizzaBase() REJECTED', rejection);
      });
    }

    /**
     * Draws an image where its center is in polar coordinates (r,azimuth)
     * @param {HTMLimageElement} image
     * @param {number} r
     * @param {number} azimuth
     * @param {number} width
     * @param {number} height
     * @private
     */

  }, {
    key: '_drawImage',
    value: function _drawImage(image, r, azimuth) {
      var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var height = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

      if (!width) width = image.width;
      if (!height) height = image.height;
      var dx = -Math.round(width / 2);
      var dy = -Math.round(height / 2);
      var realCoordinates = this._polar2carthesian(r, azimuth);
      this.ctx.drawImage(image, realCoordinates.x + dx, realCoordinates.y + dy, width, height);
    }

    /**
     * Converts polar coordinates
     * @param {number} r
     * @param {number} azimuth
     * @returns {object} {x,y} ready to draw at, based on CANVAS settings
     * @private
     */

  }, {
    key: '_polar2carthesian',
    value: function _polar2carthesian(r, azimuth) {
      var radians = azimuth * Math.PI / 180;
      var x = Math.round(r * Math.cos(radians) + _settings.CANVAS.center.x);
      var y = Math.round(-r * Math.sin(radians) + _settings.CANVAS.center.y);
      return { x: x, y: y };
    }
  }]);

  return PizzaCanvas;
}(_Component3.default);

exports.default = PizzaCanvas;
},{"../../Component":48,"../../services/PizzaImagery":61,"./settings":59}],52:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PizzaCanvas = require('./PizzaCanvas.js');

var _PizzaCanvas2 = _interopRequireDefault(_PizzaCanvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PizzaCanvas2.default;
},{"./PizzaCanvas.js":57}],37:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('../../Component');

var _Component3 = _interopRequireDefault(_Component2);

var _PizzaParams = require('../PizzaParams');

var _PizzaParams2 = _interopRequireDefault(_PizzaParams);

var _PizzaCanvas = require('../PizzaCanvas');

var _PizzaCanvas2 = _interopRequireDefault(_PizzaCanvas);

var _dom = require('../../utils/dom.js');

var dom = _interopRequireWildcard(_dom);

require('./style.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing particular order.
 */
var PizzaEditor = function (_Component) {
  _inherits(PizzaEditor, _Component);

  function PizzaEditor(props) {
    _classCallCheck(this, PizzaEditor);

    var _this = _possibleConstructorReturn(this, (PizzaEditor.__proto__ || Object.getPrototypeOf(PizzaEditor)).call(this, props));

    _this.state = {};
    dom.bindHandlers(_this, 'onParamsChange');
    _this.prerendered = _this.preRender();
    var pizzaInitialState = {
      size: 60,
      ingredients: {},
      tags: {},
      name: '',
      description: ''
    };
    _this.children = {
      pizzaCanvas: new _PizzaCanvas2.default({
        host: _this.prerendered.canvas,
        state: pizzaInitialState
      }),
      pizzaConstructor: new _PizzaParams2.default({
        host: _this.prerendered.params,
        onParamsChange: _this.onParamsChange,
        state: pizzaInitialState
      })
    };
    return _this;
  }

  /**
   * Updates pizzaCanvas when pizza params changed within pizzaConstructor
   * @param {object} state
   */


  _createClass(PizzaEditor, [{
    key: 'onParamsChange',
    value: function onParamsChange(state) {
      this.children.pizzaCanvas.updateState(state);
    }

    /**
     * Called within Component workflow
     */

  }, {
    key: 'updateChildrenState',
    value: function updateChildrenState() {
      this.children.pizzaConstructor.updateState();
      this.children.pizzaCanvas.updateState();
    }

    /**
     * Render view
     * @returns {HTMLElement}
     */

  }, {
    key: 'render',
    value: function render() {
      return this.prerendered.fragment;
    }

    /**
     * PreRenders component view.
     * @returns {object} {fragment, elements...}
     */

  }, {
    key: 'preRender',
    value: function preRender() {
      console.log(this.name + '.preRender() in having ', this.state);
      var container = dom.createElement({
        tag: 'div',
        id: 'pizzaEditor-container',
        classList: ['row-wrap']
      });

      var canvas = dom.createElement('canvas');
      var canvasContainer = dom.createElement({
        tag: 'div',
        classList: ['pizzaEditor-canvas']
      });
      canvasContainer.appendChild(canvas);
      var params = dom.createElement({
        tag: 'div',
        classList: ['pizzaEditor-params']
      });

      dom.setChildren(container, [canvasContainer, params]);

      return {
        fragment: container,
        canvas: canvas,
        params: params
      };
    }
  }]);

  return PizzaEditor;
}(_Component3.default);

exports.default = PizzaEditor;
},{"../../Component":48,"../PizzaParams":51,"../PizzaCanvas":52,"../../utils/dom.js":39,"./style.css":42}],29:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PizzaEditor = require('./PizzaEditor.js');

var _PizzaEditor2 = _interopRequireDefault(_PizzaEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PizzaEditor2.default;
},{"./PizzaEditor.js":37}],19:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultRoute = exports.routes = undefined;

var _Login = require('./components/Login');

var _Login2 = _interopRequireDefault(_Login);

var _Logout = require('./components/Logout');

var _Logout2 = _interopRequireDefault(_Logout);

var _Register = require('./components/Register');

var _Register2 = _interopRequireDefault(_Register);

var _Secret = require('./components/Secret');

var _Secret2 = _interopRequireDefault(_Secret);

var _Order = require('./components/Order');

var _Order2 = _interopRequireDefault(_Order);

var _Orders = require('./components/Orders');

var _Orders2 = _interopRequireDefault(_Orders);

var _PizzaEditor = require('./components/PizzaEditor');

var _PizzaEditor2 = _interopRequireDefault(_PizzaEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = exports.routes = {
  none: {
    url: '',
    redirectToRoute: 'home'
  },
  home: {
    name: 'Home',
    url: '/',
    redirectUnauthorizedToRoute: 'login',
    redirectAuthorizedToRoute: 'orders'
  },
  login: {
    name: 'Sign in',
    url: '/login',
    component: _Login2.default,
    navigateOnSuccessToRoute: 'orders',
    routes: ['register'] // router will xform [routeName1,...] to {routeName1:{name:,url:},..}
  },
  logout: {
    name: 'Sign out',
    url: '/logout',
    component: _Logout2.default,
    navigateOnSuccessToRoute: 'login'
  },
  register: {
    name: 'Register',
    url: '/register',
    component: _Register2.default,
    navigateOnSuccessToRoute: 'login',
    routes: ['login']
  },
  orders: {
    name: 'Orders queue',
    url: '/orders',
    redirectUnauthorizedToRoute: 'login',
    layout: true, // use Layout component
    component: _Orders2.default
  },
  order: {
    name: 'Pizza',
    url: '/order/:id',
    redirectUnauthorizedToRoute: 'login',
    component: _Order2.default
  },
  add: {
    name: 'Add pizza',
    url: '/add',
    redirectUnauthorizedToRoute: 'login',
    layout: true, // use Layout component
    component: _PizzaEditor2.default
  },
  secret: {
    url: '/secret',
    component: _Secret2.default,
    routes: ['home', 'login', 'register', 'orders', 'order', 'add']
  }
};

var defaultRoute = exports.defaultRoute = 'secret';
},{"./components/Login":23,"./components/Logout":24,"./components/Register":25,"./components/Secret":26,"./components/Order":28,"./components/Orders":27,"./components/PizzaEditor":29}],2:[function(require,module,exports) {
'use strict';

var _Router = require('./components/Router');

var _Router2 = _interopRequireDefault(_Router);

var _Layout = require('./components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _routes = require('./routes.js');

var routingConfig = _interopRequireWildcard(_routes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootHost = document.getElementById(document.getElementById('entry-script').getAttribute('data-app-container'));

window.router = new _Router2.default({
  host: rootHost,
  routes: routingConfig.routes,
  defaultRoute: routingConfig.defaultRoute,
  layoutManager: new _Layout2.default({
    host: rootHost
  })
});
},{"./components/Router":21,"./components/Layout":22,"./routes.js":19}]},{},[2])
//# sourceMappingURL=src.626caf81.map