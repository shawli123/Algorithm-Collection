/**
 * 一、题目描述
 * 实现输入一个数组，将其打平为一维数组
 *
 * 二、示例
 * 输入：[1, 2, [3, [4, [5,6]]], 7, [8,[9]]]
 * 输出：[1,2,3,4,5,6,7,8,9]
 *
 * 三、解决方案（如下）
 */
function flatten (arr = []) {
  if (!arr.length) return [];
  return arr.reduce((prev, next) => {
      return prev.concat(Array.isArray(next) ? flatten(next): next);
  }, [])
}
