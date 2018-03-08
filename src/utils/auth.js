import * as fixtures from './auth.fixtures.js';
import * as Obj from './object.js';

/**
 * Performs user login.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<any>} success or failure object
 */
export const login = (username, password) => {
  const user = Obj.find(fixtures.AUTH_FIXTURES, o => o.username === username);
  return new Promise((resolve,reject) =>
    (!user || user.password !== password) ? reject({
    success: false,
    error: "Wrong username or password",
  }) : resolve({
    success: true,
    token: user.token,
  }));
};

/**
 * Performs user logout
 */
export const logout = () => {
};

/**
 * Registers a new user
 * @param {string} username
 * @param {string} password
 * @param {string} email
 * @returns {Promise<any>} success or failure object
 */
export const register = (username, password, email) => {
  const user = Obj.find(fixtures.AUTH_FIXTURES, o => o.username === username);
  return new Promise((resolve,reject) => {
    if (!!user) {
      reject({
        success: false,
        error: "validation failed",
        validations: ["User with such username already exists"],
      });
    } else {
      const uuid = 'eafe1' + Math.floor(Math.random()*10);
      fixtures.AUTH_FIXTURES.push(
        {
          username: username,
          password: password,
          email: email,
          uuid: uuid,
          token: 'Tkn0' + Math.floor(Math.random()*10) + username,
        }
      );
      resolve({
        success: true,
        uuid: uuid,
      });
    }
  });
};
