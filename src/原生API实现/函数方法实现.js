Function.prototype.myBind = function (context) {
  if (typeof this != 'function') {
    throw new TypeError('this is not a function');
  }
  const that = this;
  const args = [...arguments].slice(1);
  return function F () {
    const _args = [...args, ...arguments];
    if (this instanceof F) {
      return new that(..._args);
    }
    return that.call(context, ..._args);
  }
}

Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('this is not a function');
  }
  const _context = context || window || {};
  _context.fn = this;
  const args = [...arguments].slice(1);
  const result = _context.fn(...args);
  delete _context.fn;
  return result;
}

Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('this is not a function');
  }
  const _context = context || window || {};
  _context.fn = this;
  const args = arguments[1] || [];
  const result = _context.fn(...args);
  delete _context.fn;
  return result;
}
