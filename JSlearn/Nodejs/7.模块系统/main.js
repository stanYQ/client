//require 在不是module.exports 导出的情况下默认得到的是一个对象
//访问内部成员需要使用 . 的方式进行访问
var fooExports = require('./foo');

console.log(fooExports);