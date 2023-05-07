// 实现compose函数, 类似于koa的中间件洋葱模型

function compose (middlewares = []) { 
  return function () {
    const run = (index) => {
      const fn = middlewares[index];
      if (!fn) {
        return null
      }
      fn(() => {
        run(index+1);
      })
    }
    return run(0);
  }
}
