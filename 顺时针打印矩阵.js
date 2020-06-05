/**
 一、题目描述
  输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

 二、示例
  输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
  输出：[1,2,3,6,9,8,7,4,5]

 三、解题思路
 边界判断法：
 https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/solution/mian-shi-ti-29-shun-shi-zhen-da-yin-ju-zhen-she-di/
 */


var spiralOrder = function(matrix) {
    if (!matrix.length) return [];
    if (!matrix[0] || !matrix[0].length) return [];
    var top = 0;
    var left =  0;
    var bottom = matrix.length - 1;
    var right = matrix[0].length - 1;
    var result = [];

    while(true) {
        // 从左向右
        for (var i = left; i <= right; i++) {
            result.push(matrix[top][i]);
        }
        top++;
        if (top > bottom) break;

        // 从上往下
        for(var j = top; j <= bottom; j++) {
            result.push(matrix[j][right]);
        }
        right--;
        if (right < left) break;

        // 从右向左
        for(var m = right; m >= left; m--) {
            result.push(matrix[bottom][m]);
        }
        bottom--;
        if (bottom < top) break;

        // 从下往上
        for(var n = bottom; n >= top; n--) {
            result.push(matrix[n][left]);
        }
        left++;
        if (left > right) break;
    }

    return result;
};


module.exports = {
    spiralOrder : spiralOrder
};
