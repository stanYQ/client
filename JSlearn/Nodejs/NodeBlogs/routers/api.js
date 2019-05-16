//api 部分的路由
var express = require('express');
//使用express router模块
var router = express.Router();
var User = require('../models/User');

var responseData;
router.use((req, res, next) => {
    responseData = {
        code: 0,//错误码
        message: ''//错误信息
    }
    next();
})

/*
 *用户名注册
 *  
 */
router.post('/user/register', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;

    //判断用户名是否为空
    if (username == '') {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);//将数据以json格式返回
        return;
    }

    if (password == '') {
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }

    if (password != repassword) {
        responseData.code = 3;
        responseData.message = '两次密码不一致';
        res.json(responseData);
        return;
    }

    //进行数据库验证
    //根据用户名向数据库查找一条数据

    User.findOne({
        username: username
    }).then((userInfo) => {
        //表示数据库中有该条数据
        if (userInfo) {
            responseData.code = 4;
            responseData.message = '用户名已经被注册';
            res.json(responseData);
            return;
        }

        createNewUser(username,password,res);
        //实例化 user 通过操作对象操作数据库
        //  User({ username: username, password: password }).save() 相同
        // var user = new User({
        //     username: username,
        //     password: password
        // })
        // return user.save();
    })
        // .then((newUserInfo) => {
        //     console.log(newUserInfo);
        // })
})

function createNewUser(username,password,res){
      User({ username: username, password: password }).save()
            .then((newUserInfo) => {
                console.log(newUserInfo);
                responseData.message = '注册成功';
                res.json(responseData);
            })
}

module.exports = router;