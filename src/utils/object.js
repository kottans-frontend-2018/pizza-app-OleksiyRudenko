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
export const map = function(obj, fn) {
  return Object.keys(obj).map(key => fn(obj[key], key));
};

export const OBJECT_FIND_RESULT_VALUE_ONLY = false;
export const OBJECT_FIND_RESULT_KEYVALUE = true;
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
export const find = function(obj, fn, resultMode = OBJECT_FIND_RESULT_VALUE_ONLY) {
  for (let [key, value] of Object.entries(obj)) {
    if (fn(value, key)) {
      if (resultMode === OBJECT_FIND_RESULT_VALUE_ONLY) return value;
      if (resultMode === OBJECT_FIND_RESULT_KEYVALUE) {
        let result = {};
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
  return undefined;
};

/**
 * Array.filter style shallow object filtering
 * @param {object} obj
 * @param {testObjectEntry} fn (value, key)
 * @returns {object} empty if neither key-value passes the test
 */
export const filter = function(obj, fn) {
  let result = {};
  for (let [key, value] of Object.entries(obj)) {
    if (fn(value, key)) {
      result[key] = value;
    }
  }
  return result;
};

/**
 * Checks if item is an Object (and not also an Array or null).
 * @param item
 * @returns {boolean}
 */
export const isObject = item => typeof item === "object" && !Array.isArray(item) && item !== null;
