/**
 *
 * @param {Function} fn
 * @description map
 */
Array.prototype.myMap = function (fn) {
  if (typeof fn !== 'function') {
      throw new TypeError('fn is not a function');
  }
  if (!this.length) return [];
  const temp = [];
  this.forEach((it,idx) => {
    temp.push(fn.call(null, it, idx, this));
  });
  return temp;
}

/**
 *
 * @param {Function} fn
 * @param {*} initValue
 * @description reduce
 * @document 参考：https://blog.csdn.net/Beijiyang999/article/details/80186242
 */
Array.prototype.myReduce = function (fn, initValue) {
  if (typeof fn !== 'function') {
    throw new TypeError('fn is not a function');
  }
  if (!this.length) {
    throw new TypeErro('Reduce of empty array with no initial value');
  }
  let result = initValue || this[0];
  const startIdx = initValue ? 0 : 1;
  for (let i = startIdx; i < this.length; i++) {
    result = fn(result, this[i], i, this);
  }
  return result;
}

