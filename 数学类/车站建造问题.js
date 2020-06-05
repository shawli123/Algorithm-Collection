/**
一、题目描述：
    有10^8个村庄排在一条公路上，依次编号为0~10^8-1，相邻村庄距离为1，其中有n个村庄居住着牛牛，居住着牛牛的村庄从小到大依次为a0~an-1，其中保证a0=0.
现在需要建设车站，有两个要求必须被满足：
1、每个有牛牛居住的村庄必须修建车站。
2、相邻车站的距离必须为1或为某个质数。
现给出n和a数组，求需要建设车站的最小数量。

二、示例
输入
3,[0,7,11]
输出
4

三、解题思路：
该题的核心在于，将一个非质数表示为最少的质数和。分情况讨论：
1、当该非质数为偶数时，可以表示为两个质数的和（根据哥德巴赫猜想）；
2、当该非质数为奇数时，分解为p=(p-2)+2：
  a. 若p-2为质数，则可表示为两个质数的和
  b. 若p-2为非质数，则可表示为三个质数的和
 */

function work (n, a) {
    var count = 1;
    for(var i = 0; i < a.length-1; i++) {
        var distance = a[i+1] - a[i];
        if (isPrime(distance)){
            // 质数
            count++;
        } else if (distance % 2 === 0) {
            // 偶数
            count += 2;
        } else {
            // 奇数
            if (isPrime(distance - 2)) {
                count += 2;
            } else {
                count += 3;
            }
        }
    }
    return count;
}

function isPrime (num) {
    if (num !== +num) return false;
    if (num !== ~~num) return false;
    if (num === 2) return true;
    for (var i = 2; i <= ~~Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

module.exports = {
    work : work
};
