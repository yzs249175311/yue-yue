<template>
    <div id="main">
      <BookItemCom :="item" v-for="item in datalist"></BookItemCom>
    </div>
</template>

<script lang="ts" setup>
import BookItemCom from "./BookItemCom.vue"
defineProps(['datalist'])
</script>