/**
解题思路：
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
