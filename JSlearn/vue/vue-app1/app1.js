// 必须先实例化 Vue对象
let app1 = new Vue({
    el: "#vue-app1",
    data:{
        name:"Mr.Stan",
        job:"Web开发",
        website:"http://www.thenewstep.com",
        websiteTag:"<a href='http://www.thenewstep.com'> ThenNewStep</a>"
    },
    methods: {
        greet:function(time){
            return 'Good '+ time + " "+ this.name +"!";
        }
    },
});

/*
 * el: element 需要获取的元素，一定是HTML中的根容器元素
 * data: 用于数据存储
 * methods: 用于存储各种方法
 * data-binding:给属性绑定对应的值
 */