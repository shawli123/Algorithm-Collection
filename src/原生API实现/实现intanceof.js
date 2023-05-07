// instanceof 运算符用于
function myIntanceof (child, parent) {
  const parentProto = parent.prototype; // 获取构造函数的prototype对象
  let childProto =  Object.getPrototypeOf(child);
  // 判断构造函数的prototype 属性是否出现在对象的原型链中的任何位置
  while(true) {
    if (!childProto) return false;
    if (childProto === parentProto) return true;
    childProto = Object.getPrototypeOf(childProto);
  }
}
