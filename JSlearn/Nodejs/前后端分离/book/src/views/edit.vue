<template>
  <div id="edit">
    <h1>this is edit page</h1>
    <router-link to="/">主页</router-link>
    <br>名称:
    <input type="text" required v-model="book.name" name="name">
    <br>作者:
    <input type="text" v-model="book.author" name="author">
    <br>分类:
    <input type="text" v-model="book.category" name="category">
    <br>描述:
    <input type="text" v-model="book.description" name="desc">
    <br>
    <button v-on:click="edit()">添加</button>
    <p>{{getData.name }}</p>
  </div>
</template>


<script>
import { getBookById } from "../api";
import { editBook } from "../api";
export default {
  data() {
    return {
      book: {},
      id: this.$route.params.id
    };
  },
  created() {
    getBookById(this.id)
      .then(result => {
        this.book = result.data;
      })
      .catch(err => {
        throw err;
      });
  },
  methods: {
    edit: function() {
      editBook(this.book)
        .then(result => {
          if (result.data.flag === 1) {
            window.location.href = "/";
          }
        })
        .catch(err => {
          throw err;
        });
    }
  },
  computed: {
    getData: function(){
      return this.book;
    }
  },
};
</script>
<style>
</style>
