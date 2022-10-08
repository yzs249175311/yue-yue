<template>
  <el-container>
    <el-header>
      <router-link :to="{path:'search'}"></router-link>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
</el-container>
</template>

<script setup lang="ts">

// import SearchCom from './components/SearchCom.vue';
// import BookListCom from './components/book/BookListCom.vue';

</script>

<style scoped lang="less">
.el-main {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: stretch;
  width: 80vw;
}

</style>
