Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new Error('this is not a function');
  }
  const args = [...arguments].slice(1);
  const fn = this;

  return function F () {
    const _args = [...args, ...arguments];
    const that = this instanceof F ? this : context;
    return fn.apply(that, _args);
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


