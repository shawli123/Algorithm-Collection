// https://blog.csdn.net/zp19860529/article/details/118029770?
function _new (Parent, ...args) {
  const obj = Object.create(Parent.prototype);
  const res = Parent.apply(obj, args);
  return typeof res === 'object' ? res : obj;
}

function Parent (name, age) {
  this.name = name;
  this.age = age;
}

const child = _new(Parent, 'shawli', 26);
console.log(child);
