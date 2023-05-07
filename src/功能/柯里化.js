// 使用柯里化实现数字相加

// 参数长度固定
var add = (m) => {
  return (n) => {
    if (n === undefined) {
      return m;
    }
    return add(m+n)
  }
}


// 参数长度不固定
function currying (fn) {
  let args = []
  return function temp (...newArgs) {
      if (newArgs.length) {
          args = [
              ...args,
              ...newArgs
          ]
          return temp
      } else {
          let val = args.reduce((a, b) => a + b, 0);
          args = [] //保证再次调用时清空
          return val
      }
  }
}
let addCurry = currying(add)
console.log(addCurry(1)(2)(3)(4, 5)())  //15
console.log(addCurry(1)(2)(3, 4, 5)())  //15
console.log(addCurry(1)(2, 3, 4, 5)())  //15