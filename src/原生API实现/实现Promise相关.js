// 版本1. 实现一个简易Promise
function MyPromise (fn) {
  if (typeof fn !== 'function') return;

  this.then = (cb) => {
    if (typeof cb === 'function') {
      this.succCb = cb;
    }
    return this;
  }

  this.catch = (cb) => {
    if (typeof cb === 'function') {
      this.catchCb = cb;
    }
    return this;
  }

  this.resolve = (...args) => {  
    setTimeout(() => {
      this.state = 'resolved';
      this.succCb(...args);
    }, 0)
  }

  this.reject = (...args) => {
    setTimeout(() => {
      this.state = 'rejected';
      this.catchCb(...args)
    }, 0)
  }
  
  try {
    this.state = 'pending';
    fn(this.resolve, this.reject);
  } catch (error) {
    this.reject(error);
  }
}

// 版本2
class MyPromise {
  construtor (fn) {
    this.state = 'pending';
    this.result = null;
    this.reason = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    fn(this.resolve.bind(this), this.reject.bind(this))
  }
  resolve (result) {
    if (this.state === 'pending') {
      this.state = 'fulfilled';
      this.result = result;
      this.onFulfilledCallbacks.forEach(cb => {
        cb(result);
      })
    }
  }
  reject (reason) {
    if (this.state === 'pending') {
      this.state = 'rejected';
      this.reason = reason;
      this.onRejectedCallbacks.forEach(cb => {
        cb(reason);
      })
    }
  }
  /**
   * @param {*} onFulfilled 
   * @param {*} onRejected 
   * @returns 
   */
  then (onFulfilled, onRejected) {
    let promise2 = new MyPromise((resolve, reject) => {
      const fulfilledCb = () => {
        setTimeout(() => {
          if (typeof onFulfilled !== 'function') {
            resolve(this.result);
          } else {
            const x = onFulfilled(this.result);
            this.resolvePromise(promise2, x, resolve, reject);
          }
        }, 0);
      }
      const rejectCb = () => {
        setTimeout(() => {
          if (typeof onRejected !== 'function') {
            reject(this.reason);
          } else {
            const x = onRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          }
        }, 0);  
      }

      if (this.state === 'fulfilled') {
        fulfilledCb();
      } else if (this.state === 'rejected') {
        rejectCb();
      } else if (this.state === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          fulfilledCb();
        });
        this.onRejectedCallbacks.push(() => {
          rejectCb();
        })
      } 
    })
    return promise2;
  }
  resolvePromise (promise2, x, resolve, reject) {
    if (x === promise2) {
      throw new TypeError('promise error');
    }
    if (x instanceof MyPromise) {
      x.then(y => {
        this.resolvePromise(promise2, y, resolve, reject);
      }, reject);
    } else if (x !== null && (typeof x === "object" || typeof x === 'function')) {
      try {
        const then = x.then;
        if (typeof then === 'function') {
          let called = false;
          then.call(x, (y) => {
            if (called) return;
            called = true;
            this.resolvePromise(promise2, y, resolve, reject);
          }, r => {
            if (called) return;
            called = true;
            reject(r);
          })
        } else {
          resolve(x);
        }
      } catch (error) {
        reject(error);
      }
    } else {
      return resolve(x);
    }
  }
}

// const succRes = new MyPromise((resolve, reject) => {
//   resolve('李晓伟是个前端大神');
// }).then(res => {
//   console.log(res);
// });

// const errRes = new MyPromise((resolve, reject) => {
//   reject('李晓伟是个前端大佬');
// }).catch(e => {
//   console.error(e);
// })



// 实现Promise.all
Promise.all = (promises) => {
  if (!Array.isArray(promises)) {
    throw new Error('argument is not a array');
  }
  const result = [];
  let count = 0;
  const len = promises.length;

  return new Promise((resolve, reject) => {
    if (!len) return resolve(result);

    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(res => {
        result[i] = res;
        count++;
        if (count === len) {
          // 遍历完成
          return resolve(result);
        }
      }).catch(e => {
        return reject(e);
      })
    }
  })
}

//  实现一个Promise.race
Promise.race = (promises) => {
  if (!Array.isArray(promises)) {
    throw new Error('argument is not a array');
  }
  const len = promises.length;

  return new Promise((resolve, reject) => {
    if (!len) return resolve(null);

    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(res => {
        return resolve(res);
      }).catch(e => {
        return reject(e);
      })
    }
  })
}