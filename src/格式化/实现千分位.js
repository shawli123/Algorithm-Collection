/**
 * 一、题目描述
 * 实现输入一个数字，将其格式化为千分位表示
 *
 * 二、示例
 * 输入：1234567890
 * 输出：1,234,567,890
 *
 * 三、解决方案（如下）
 */

// 1.正则表达法
function formatNum1(num) {
  let _num = num === +num ? "" + num : num;
  return _num.replace(/\d{1,3}(?=(\d{3})+$)/g, "$&,");
}

// 2. 常规for循环法
function formatNum2(num) {
  num = num + "";
  const arr = num.split("").reverse();
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    if ((i + 1) % 3 === 0 && i + 1 !== arr.length) {
      str = `,${arr[i]}` + str;
    } else {
      str = arr[i] + str;
    }
  }
  return str;
}

// 3. js原生API: toLocaleString
function formatNum3 (num) {
  num = Number(num);
  if (typeof num !== "number") return '';
  return num.toLocaleString();
}


// 4. 取余法
function formatNum4 (num) {
  let str = num.toString();
  let len = str.length;
  if (len <= 3) {
    return num;
  }
  const reminder = len % 3;
  if (reminder > 0) {
    return str.slice(0, reminder) + ',' + str.slice(reminder, len).match(/\d{3}/g).join(',');
  } else {
    return str.slice(0, len).match(/\d{3}/g).join(',');
  }
}
