// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
    data: function () {//不让data 暴露在外部  每复用这个组件 都不会影响之前的使用 （闭包？）
      return {
        count: 0
      }
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
  })

  new Vue({
      el:"#vue-test",
  })