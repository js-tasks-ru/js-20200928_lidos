/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export const createGetter = path => obj => {
  function getValue(obj, keys) {
    keys = (typeof keys === "string") ? keys.split(".") : keys;
    
    const key = keys.shift()

    if (obj.hasOwnProperty(key) && keys.length === 0)
        return obj[key];
    else if (!obj.hasOwnProperty(key))
        return
    else
        return getValue(obj[key], keys)
  }
  
  return getValue(obj, path)
}
