var counter = function(arr){
    return '一共有'+arr.length + '个元素';
}

var adder = function(a,b){
    return "您需要计算的两个值的和为:" + (a+b);
    //${a+b} 属于ES6的语法
}

var pi = 3.14;
//module
module.exports.counter = counter;
//将 counter方法export
module.exports.adder = adder;
module.exports.pi = pi;