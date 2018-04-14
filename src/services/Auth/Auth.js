import {API} from '../API';

class AuthService {
  constructor() {
  }

  login(username, password) {
    return API.login({
      username,
      password,
    });
  }

  logout() {
    API.logout();
  }

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

  getStoreList() {
    return API.getStoreList();
  }

  getIngredients() {
    return API.getIngredientList();
  }

  isAuthorized() {
    return !!API._getToken();
  }
}

export const Auth = new AuthService();
