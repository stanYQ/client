<template>
  <div id="edit">
    <h1>图书管理</h1>
    <router-view></router-view>
  </div>
</template>


<script>
export default {
  data() {
    return {
      id: this.$route.params.id
    };
  },
  created() {
    //   console.log(this.id)
  }
};
</script>
<style>
</style>
