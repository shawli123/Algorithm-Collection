function generatorToAsync (genFunc) {
  return function () {
    return new Promise((resolve, reject) => {
      const gen = genFunc.call(this, ...arguments);

      function step (key, arg) {
        try {
          const res = gen[key](arg);
          const { value, done } = res;
          if (done === true) {
            return resolve(res);
          }
          return Promise.resolve(value).then(val => step('next', val)).catch(e => step('throw', e))
        } catch (error) {
          return reject(error);
        }
      } 
      // 首次执行
      step('next');
    })
  }
}