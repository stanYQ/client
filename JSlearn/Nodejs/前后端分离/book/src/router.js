import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'
import Edit from './views/edit.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Home },
    { path: '/edit/:id', component: Edit }
  ],
  mode:'history'
  
})
