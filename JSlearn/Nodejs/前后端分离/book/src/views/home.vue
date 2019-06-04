<template>
  <div id="home">
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>name</th>
            <th>author</th>
            <th>category</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(book, index) in books" :key="index">
            <td>{{book.id}}</td>
            <td>{{book.name}}</td>
            <td>{{book.author}}</td>
            <td>{{book.category}}</td>
            <td>{{book.description}}</td>
            <td>
              <button v-on:click="removeBook(book.id)">删除</button>
              <router-link v-bind:to="'/edit/'+ book.id" >修改</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import {getAllBook} from '../api';
import {remove} from '../api';
export default {
  data() {
    return {
      books: []
    };
  },
  methods: {
    removeBook: function(id) {
        remove(id).then(result => {
          if (result.data.flag == 1) {
             getAllBook().then((result)=>{
               this.books = result.data;
             })
          } else {
            alert("delete data fail");
          }
        })
        .catch(err => {
          throw err;
        });
    }
  },
  created() {
    getAllBook().then((result)=>{
      this.books = result.data;
    })
  }
};
</script>
<style>
</style>
