// 节流
function throttle (fn, timeout) {
  let start = Date.now();
  return function (...args) {
    if (Date.now() - start < timeout) {
      return;
    }
    start = Date.now();
    fn.apply(this, args);
  }
}

// 防抖
function debounce (fn, timeout) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
        return fn.apply(this, args);
    }, timeout);
  }
}
