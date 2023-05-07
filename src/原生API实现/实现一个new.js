// https://blog.csdn.net/zp19860529/article/details/118029770?
function _new (Parent, ...args) {
  const obj = Object.create(Parent.prototype); // 创建一个对象，将对象的__proto__属性指向构造函数的prototype属性
  const res = Parent.apply(obj, args); // 构造函数中的this指向该对象(为这个对象添加属性和方法)
  return typeof res === 'object' ? res : obj;
}

function Parent (name, age) {
  this.name = name;
  this.age = age;
}

const child = _new(Parent, 'shawli', 26);
console.log(child);
