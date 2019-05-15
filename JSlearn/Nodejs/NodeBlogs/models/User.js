//User 模型
var mongoose = require('mongoose');

var userSchemas = require('../schemas/users');

//mongoose 返回一个构造函数   new 生成一个表结构对象 包涵许多方法对表进行操作
module.exports = mongoose.model('User',userSchemas);