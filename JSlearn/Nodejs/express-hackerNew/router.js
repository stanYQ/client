let express = require('express');
//创建一个router 对象（router 即是一个对象也是一个函数）
let router = express.Router();

//通过router 对象设置（挂载） 路由
router.get('/',(req,res)=>{
    res.send('this is index page');
})

router.get('/index',(req,res)=>{

})

router.get('/submit',(req,res)=>{

})

router.get('/item',(req,res)=>{

})

router.get('/add',(req,res)=>{

})

router.post('/add',(req,res)=>{

})

//返回router 对象
module.exports = router;

