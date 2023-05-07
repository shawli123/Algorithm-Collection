/**
 * 参考：https://www.cnblogs.com/wisewrong/p/14768071.html
 */

function EventBus () {
  this.tasks = {};

  // 注册事件
  this.on = (type, fn) => {
    if (!this.tasks[type]) {
      this.tasks[type] = [];
    }
    this.tasks[type].push(fn);
  }

  // 注册一个只能执行一次事件
  this.once = (type, fn) => {
    if (!this.tasks[type]) {
      this.tasks[type] = [];
    }

    const that = this;
    function _once (...args) {
      fn(...args);
      that.off(type, _once);
    }

    this.tasks[type].push(_once);
  }

  // 触发事件
  this.emit  = (type, ...args) => {
    if (!this.tasks[type]) return;

    this.tasks[type].forEach(fn => {
      fn(...args);
    });
  }

  // 移除事件
  this.off = (type, fn) => {
    if (!this.tasks?.[type]?.length) {
      return;
    }
    if (!fn) {
      delete this.tasks[type];
      return;
    }
    this.tasks[type] = this.tasks[type].filter(it => it !== fn);
  }
}