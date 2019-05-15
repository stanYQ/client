/**users 表结构**/
var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    //用户名
    username:String,
    password:String,
})