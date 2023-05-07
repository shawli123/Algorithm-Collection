// 阉割版
function deepClone (target) {
  if (typeof target !== 'object') {
    return target;
  }
  let temp = Array.isArray(target) ? [] : {};
  for (const key in target) {
    temp[key] = deepClone(target[key]);
  }
  return temp;
}

// 牛逼版
const _completeDeepClone = (target, map = new WeakMap()) => {
  // 基本数据类型，直接返回
  if (typeof target !== 'object' || target === null) return target
  // 函数 正则 日期 ES6新对象,执行构造器，返回新的对象
  const constructor = target.constructor
  if (/^(Function|RegExp|Date|Map|Set)$/i.test(constructor.name)) return new constructor(target)
  // map标记每一个出现过的属性，避免循环引用
  if (map.get(target)) return map.get(target)
  map.set(target, true)
  const cloneTarget = Array.isArray(target) ? [] : {}
  for (prop in target) {
    // 只克隆对象本身的属性
    if (target.hasOwnProperty(prop)) {
      cloneTarget[prop] = _completeDeepClone(target[prop], map)
    }
  }
  return cloneTarget
}