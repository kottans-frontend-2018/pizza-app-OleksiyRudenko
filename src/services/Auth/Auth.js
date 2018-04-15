import {API} from '../API';

class AuthService {
  constructor() {
    this.cache = {
      tags: [],
      ingredients: [],
    };
  }

  /**
   * Returns promise for user login success
   * @param username
   * @param password
   * @returns {*|Promise|{name, url, component, navigateOnSuccessToRoute, routes}}
   */
  login(username, password) {
    return API.login({
      username,
      password,
    });
  }

  /**
   * Logs current user out
   */
  logout() {
    API.logout();
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
  register(username, password, password_repeat, email, store_id, store_password) {
    return API.createUser({
      username,
      password,
      password_repeat,
      email,
      store_id,
      store_password
    }).catch(rejection => Promise.reject(rejection)); // .then(result => result).catch(rejection => Promise.reject(rejection));
  }

  /**
   * Returns promise for a store list object
   * @returns {*|Promise<{success: boolean, list: *[]}>}
   */
  getStoreList() {
    return API.getStoreList();
  }

  /**
   * Returns promise for and array of ingredient objects
   * @returns {Promise}
   */
  getIngredients() {
    if (this.cache.ingredients.length === 0) {
      return API.getIngredientList().then(data => this.cache.ingredients = data.results).catch(rejection => []);
    }
    return Promise.resolve(this.cache.ingredients);
  }

  /**
   * Returns promise for an array of tag objects
   * @returns {Promise}
   */
  getTags() {
    if (this.cache.tags.length === 0) {
      return API.getTagList().then(data => this.cache.tags = data.results).catch(rejection => []);
    }
    return Promise.resolve(this.cache.tags);
  }

  /**
   * Returns authorization status
   * @returns {boolean}
   */
  isAuthorized() {
    return !!API._getToken();
  }
}

export const Auth = new AuthService();
