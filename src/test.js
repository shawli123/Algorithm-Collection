// const arr = [
//   [0 , 1 , 2 , 3 , 4 ],
//   [5 , 6 , 7 , 8 , 9 ],
//   [10, 11, 12, 13, 14],
//   [15, 16, 17, 18, 19],
//   [20, 21, 22, 23, 24],
// ];

// function expand(array) {
//   return result;
// }
// console.log(expand(arr));
// // > 0, 6, 10, 16, 20, 1, 5, 11, 15, 21, 2, 8, 12, 18, 22, 3, 7, 13, 17, 23, 4, 14, 24, 9, 19



function isMatch (str = '') {
  if (!str) return false;
  const map = {
    '{': "}",
    "[": "]",
    "(": ")",
  }
  let stack = [];
  const arr = str.split('');
  for (let i = 0; i < arr.length; i++) {
    const it = arr[i];
    if (map[it]) {
      stack.push(it);
    } else {
      const len = stack.length;
      if (map[stack[len-1]] !== it) {
        return false;
      }
      stack.pop();
    }
  }
  return !stack.length;
  
}

console.log(isMatch('{[()]}'));
console.log(isMatch('{[()}]'));
 
