class APIService {
  constructor({endPoint}) {
    if (endPoint.length && endPoint[endPoint.length-1]!=='/') endPoint += '/';
    this.endPoint = endPoint;
    this.APIOwner = 'https://github.com/lempiy/Kottans-Pizza-Api/';
    if (!window.localStorage.token) window.localStorage.token = null;
  }

  // ====== API methods

  // ------ STORE
  /**
   * Get store list via API
   * @returns {Promise<{success: boolean, list: []}>}
   */
  getStoreList() {
    return this._get('store/list', false).then(result => {
      console.log('API.getStoreList(): responded', result);
      return {
        success: true,
        list: result,
      };
    }).catch(error => Promise.reject(error));
  }

  // ------ USERS
  /**
   * Creates user via API
   * @param {object} registrationData
   * @returns {Promise}
   */
  createUser(registrationData = {}) {
    registrationData = Object.assign({
      username: null,
      password: null,
      password_repeat: null,
      email: null,
      store_id: 0,
      store_password: null,
    }, registrationData);
    console.log('API.createUser() request for', registrationData);
    return this._post('user/create', registrationData, false).then(result => {
      console.log('API.createUser(): responded', result);
      return result;
    }).catch(rejection => Promise.reject(rejection));
  }

  /**
   * Gets and stores auth token on success via API
   * @param {object} loginData
   * @returns {Promise}
   */
  login(loginData = {}) {
    loginData = Object.assign({
      username: null,
      password: null,
    }, loginData);
    return this._post('user/login', loginData, false).then(result => {
      this._setToken(result.token);
      console.log('API.login(): responded', result);
      return result;
    }).catch(error => Promise.reject(error));
  }

  /**
   * Gets current user info via API
   * @returns {Promise<{success: boolean}>}
   */
  getUserInfo() {
    return this._get('user/my_info').then(result => {
      console.log('API.getUserInfo(): responded', result);
      return Object.assign({
        success: true,
      }, result)
    }).catch(error => Promise.reject(error));
  }

  /**
   * Removes current token
   */
  logout() {
    this._setToken(null);
  }

  // ------ PIZZA
  /**
   * Gets pizza list via API
   * @param {object} params - url params
   * @returns {Promise<{success: boolean}>}
   */
  getPizzaList(params = {}) {
    params = Object.assign({
      offset: 0,
      limit: 100,
    }, params);
    return this._get('pizza/list',params).then(result => {
      console.log('API.getPizzaList(): responded', result);
      return Object.assign({
        success: true
      }, result);
    }).catch(error => Promise.reject(error));
  }

  /**
   * Creates pizza via API
   * @param {object} pizzaProps
   * @returns {Promise}
   */
  createPizza(pizzaProps = {}) {
    pizzaProps = Object.assign({
      name: null,
      description: null,
      size: 30,
      ingredients: JSON.toString([]),
      tags: JSON.toString([]),
      image: null,
    }, pizzaProps);
    return this._post('pizza/create',pizzaProps).then(result => {
      console.log('API.createPizza(): responded', result);
      return result;
    }).catch(error => Promise.reject(error));
  }

  // ------ INGREDIENT
  /**
   * Gets ingredients list via API
   * @param {object} params - url params
   * @returns {Promise<{success: boolean}>}
   */
  getIngredientList(params = {}) {
    params = Object.assign({
      offset: 0,
      limit: 100,
    }, params);
    return this._get('ingredient/list',params).then(result => {
      console.log('API.getIngredientList(): responded', result);
      return Object.assign({
        success: true
      }, result);
    }).catch(error => Promise.reject(error));
  }

  // ------ TAG
  /**
   * Gets tags list via API
   * @param {object} params - url params
   * @returns {Promise<{success: boolean}>}
   */
  getTagList(params = {}) {
    params = Object.assign({
      offset: 0,
      limit: 100,
    }, params);
    return this._get('tag/list',params).then(result => {
      console.log('API.getTagList(): responded', result);
      return Object.assign({
        success: true
      }, result);
    }).catch(error => Promise.reject(error));
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
  _get(resource, params = {}, isAuthRequired = true) {
    if (typeof(params) === typeof(true)) {
      isAuthRequired = params;
      params = {};
    }
    const urlParams = new URLSearchParams();
    Object.keys(params).forEach(key => {urlParams.append(key, params[key])});
    if (urlParams.toString().length) {
      resource += '?' + urlParams;
    }
    return (isAuthRequired && !this._getToken()) ?
      new Promise((resolve, reject) => {
        reject({
          success: false,
          error: 'Authorization required',
        })
      }) :
      this._request('get', resource, {
        headers: this._headers({}, isAuthRequired)
      }).then(result => result).catch(rejection => Promise.reject(rejection));
  }

  /**
   * Makes POST request via API
   * @param {string} resource
   * @param {*} data
   * @param {boolean} isAuthRequired
   * @returns {Promise<any>}
   * @private
   */
  _post(resource, data, isAuthRequired = true) {
    if (isAuthRequired && !this._getToken()) {
      return new Promise((resolve, reject) => {
        reject({
          success: false,
          error: 'Authorization required',
        })
      });
    }
    const request = {
      body: JSON.stringify(data),
      headers: this._headers({}, isAuthRequired),
    };
    return this._request('post', resource, request);
  }

  /**
   * Makes an API call
   * @param {string} method
   * @param {string} resource
   * @param {object} params
   * @returns {Promise<any>}
   * @private
   */
  _request(method, resource, params = {}) {
    const url = this._makeUrl(resource);
    params = Object.assign({
      /* cache: 'no-cache',              // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin',     // include, same-origin, *omit */
      method: method.toUpperCase(),   // *GET, POST, PUT, DELETE, etc.
      /* mode: 'cors',                   // no-cors, cors, *same-origin
      redirect: 'follow',             // *manual, follow, error
      referrer: 'client',             // *client, no-referrer */
    }, params);
    console.log('API._request: requested', url, params);
    return fetch(url, params).then(response => {
      console.log('API._request: responded', response);
      if (!response.ok) {
        console.log('API._request: NOT OK', response.status, response.statusText);
        return Promise.reject(response.json());
      }
      return /* (params.raw) ? response : */ response.json();
    }).catch(rejection => {
      // console.log('API._request: rejection Before', rejection);
      // Error => {success:false, error:'...'}
      if (!rejection.success === false) {
        rejection = {
          success: false,
          serverError: true,
          error: rejection,
        };
      }
      console.log('API._request: rejection', rejection);
      return Promise.reject(rejection);
    });
  }

  /**
   * Compiles request headers
   * @param {object} headersData
   * @param {boolean} isAuthRequired
   * @returns {Headers}
   * @private
   */
  _headers(headersData = {}, isAuthRequired = true) {
    if (isAuthRequired) {
      headersData.authorization = headersData.authorization || `Bearer ${this._getToken()}`;
    }
    const headers = new Headers();
    headersData = Object.assign({
      accept: 'application/json',
    }, headersData);
    Object.keys(headersData).forEach(key => {
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
  _makeUrl(resource) {
    return this.endPoint + resource;
  }

  _getToken() {
    return window.localStorage.token;
  }

  _setToken() {
    window.localStorage.token = null;
  }
}

export const API = new APIService({
  endPoint: 'https://pizza-tele.ga/api/v1/',
});
