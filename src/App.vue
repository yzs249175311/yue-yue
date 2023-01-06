<template>
	<el-container>
		<el-header id="nav">
			<router-link
				:to="{ path: '/search' }">搜索</router-link>
			<a href="https://50project-practise.vercel.app/" target="_blank">练习</a>
			<div class="music-title"></div>
		</el-header>
		<el-main>
			<router-view></router-view>
		</el-main>
	</el-container>
	<MusicPlayerCom></MusicPlayerCom>
</template>

<script setup lang="ts">

import MusicPlayerCom from './components/music-player/index.vue'

</script>

<style scoped lang="scss">
.el-container {
	width: 100vw;
	height: 100%;
	display: flex;
	flex-flow: column nowrap;

	.el-header {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
		border-bottom: 1px solid #e3e3e3;
		box-shadow: 0 0px 5px 1px #e3e3e3;

		.music-title {
			margin-left: auto;
		}
	}

	.el-main {
		display: flex;
		justify-content: flex-start;
	}

	.el-header :nth-child(n) {
		margin: 0 10px;
	}
}
</style>
