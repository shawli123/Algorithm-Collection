function MyPromise(fn) {
  const that = this;
  this.then = function(succCb) {
    that.succCb = succCb;
    return that;
  };

  this.catch = (errCb) => {
    that.errCb = errCb;
    return that;
  }

  this.resolve = (...args) => {
    setTimeout(() => {
      that.succCb(...args);
    }, 0);
  };

  this.reject = (...args) => {
    setTimeout(() => {
      that.errCb(...args);
    }, 0)
  };
  if (typeof fn === 'function') {
    fn(this.resolve, this.reject); // 不能返回this哦
  }
}

const succRes = new MyPromise((resolve, reject) => {
  resolve('李晓伟是个前端大神');
}).then(res => {
  console.log(res);
});

const errRes = new MyPromise((resolve, reject) => {
  reject('李晓伟是个前端大佬');
}).catch(e => {
  console.error(e);
})
