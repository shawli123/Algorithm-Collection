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
    throw new TypeError('Reduce of empty array with no initial value');
  }
  let prev = initValue || this[0];
  const startIdx = initValue ? 0 : 1;
  for (let i = startIdx; i < this.length; i++) {
    prev = fn(prev, this[i], i, this);
  }
  return prev;
}


// 实现扁平化数组
function flatten(arr, depth = Infinity) {
  if (!arr.length) return [];

  if(!depth || depth <= 0) {
    return arr;
  }

  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flatten(next, depth - 1) : next);
  }, [])
}

// push
Array.prototype.push = () => {
  const args = [...arguments];
  if (args.length) {
    for (let i = 0; i < args.length; i++) {
      this[this.length] = args[i];
    }                                                                                            
  }
  return this.length; // 返回长度
}

// filter
Array.prototype.filter = (fn) => {
  if (typeof fn !== 'function') {
    throw new Error('argument is not a function');
  }
  if (!this.length) {
    return this;
  }
  const res = [];
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i], i)) {
      res.push(this[i]);
    }
  }
  return res;
}

// map
Array.prototype.map = (fn) => {
  if (typeof fn !== 'function') {
    throw new Error('argument is not a function');
  }
  if (!this.length) {
    return this;
  }
  const res = [];
  for (let i = 0; i < this.length; i++) {
    res[i] = fn(this[i], i);
  }
  return res;
}
