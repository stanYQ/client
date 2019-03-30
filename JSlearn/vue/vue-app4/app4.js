let app4 = new Vue({
    el:"#vue-app4",
    data:{
       changeColor: false,
       changeLength: false,
    },
    methods: {
        
    },
    computed: {
       compClass:function(){
           return {
               changeColor:this.changeColor,
               changeLength:this.changeLength
           }
       } 
    },
});