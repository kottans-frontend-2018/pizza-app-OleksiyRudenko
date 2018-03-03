/**
 * Callback for manipulating object entry key and value.
 *
 * @callback manipulateObjectEntry
 * @param {string} key - entry key
 * @param {string} value - entry value
 */

/**
 * Array.map style shallow object mapping
 * @param {object} obj
 * @param {manipulateObjectEntry} fn (key, value)
 * @returns {array}
 */
export const map = function(obj, fn) {
  return Object.keys(obj).map(key => fn(key, obj[key]));
};
