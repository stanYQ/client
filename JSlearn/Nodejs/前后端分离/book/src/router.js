import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'
import Edit from './views/edit.vue'
import Add from './views/add.vue'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Home },
    { path: '/edit/:id', component: Edit },
    { path: '/add', component: Add}
  ],
  mode:'history'
  
})
