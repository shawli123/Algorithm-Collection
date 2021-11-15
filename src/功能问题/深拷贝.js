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
