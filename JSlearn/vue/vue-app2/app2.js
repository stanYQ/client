let app2 = new Vue({
    el: "#vue-app2",
    data: {
        age: 30,
        X:0,
        Y:0
    },
    methods:{
        add:function(inc){
            this.age += inc;
        },
        subscribe:function(dec){
            this.age -= dec;
        },
        updateXY: function(event){
            this.X = event.offsetX;
            this.Y = event.offsetY;
        },
        stopMoving: function(even){
            even.stopPropagation();
           }
        

    }
})