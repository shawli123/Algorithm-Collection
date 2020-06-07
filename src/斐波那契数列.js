/**
 * @param {number} n
 * @return {number}
 */
// 递归方式
function fibonacci (n) {
    if (n === 0) return 0;
    if (n === 1 || n === 2) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 非递归方式
function fib (n) {
  if (n === 0) return 0;
  var sum = 1;
  var n1 = 1;
  var n2 = 1;
  for (var i = 3; i <= n; i++) {
    sum = n1 + n2;
    n1 = n2;
    n2 = sum;
  }
  return sum;
}
