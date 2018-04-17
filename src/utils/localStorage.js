/**
 * Stores serialized data at localStorage
 * @param {string} key
 * @param {*} value
 */
export const set = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Retrieves and unserializes data from localStorage
 * @param {string} key
 */
export const get = key => {
  const data = window.localStorage.getItem(key);
  if (!!data) {
    return JSON.parse(data);
  }
  return data;
};
