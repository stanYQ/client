<template>
  <div id="add">
    <h1>this is add page</h1>
    <router-link to="/">主页</router-link>
    <br>
    名称:
    <input type="text" required v-model="book.name" name="name">
    <br>作者:
    <input type="text" v-model="book.author" name="author">
    <br>分类:
    <input type="text" v-model="book.category" name="category">
    <br>描述:
    <input type="text" v-model="book.description" name="desc">
    <br>
    <button v-on:click="add()">添加</button>
  
  </div>
</template>


<script>
import {addBook} from '../api'
export default {
  data() {
    return {
      book: {}
    };
  },
  created() {
    //   console.log(this.id)
  },
  methods: {
    add:function(){
      addBook(this.book).then((result) => {
        if(result.data.flag === 1){
          window.location.href = '/';
        }
      }).catch((err) => {
        throw err;
      });
    }
  },

};
</script>
<style>
</style>
