var foo = "bar";
function add(x, y) {
    return x + y;
}

//只能得到我想要给你的
//这样做的目的是为了解决命名冲突
exports.add = add;

//因为exports 是一个对象  
//我们可通过多次对着个对象添加成员实现导出多个内部成员
exports.str = 'str';
//require 通过 expotrs 默认得到的是一个对象
//现在我有一个需求
//我希望require加载引入 return就是一个：
/* 
 *方法
 *字符串
 *数字
 *数组
 */

 //如果一个模块需要直接导出某个成员，而非挂载的方式
 //必须使用下列的方式
 module.exports = add;
 //而非 exports = add