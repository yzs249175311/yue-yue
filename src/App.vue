<template>
	<el-container>
		<el-header>
			<router-link :to="{path:'/search'}">搜索</router-link>
			<a href="https://50project-practise.vercel.app/" target="_blank">练习</a>
		</el-header>
		<el-main>
			<router-view></router-view>
		</el-main>
	</el-container>
	<MusicPlayerCom></MusicPlayerCom>
</template>

<script setup lang="ts">

// import SearchCom from './components/SearchCom.vue';
// import BookListCom from './components/book/BookListCom.vue';
 import MusicPlayerCom from './components/music-player/index.vue'

</script>

<style scoped lang="less">
.el-container {
	width: 100vw;
	height: auto;
}

.el-main {
	display: flex;
	align-self: center;
	flex-flow: column nowrap;
	align-items: center;
	width: 100%;
}

.el-header {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
	border-bottom: 1px solid #e3e3e3;
}

 .el-header :nth-child(n) {
	margin: 0 10px; 
 }
</style>
