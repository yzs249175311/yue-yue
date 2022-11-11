<template>
	<el-card class="main">
		<template #header>
			<slot name="img"></slot>
			<h3 class="title">
				<a :href="link" target="_blank">{{ title }}</a>
			</h3>
		</template>
		<p class="desc">{{ desc }}</p>
		<a class="link" :href="link" target="_blank">{{ link }}</a>
		<span class="from">from:{{ from }}</span>
	</el-card>
</template>

<script lang="ts" setup>
defineProps(["title", "desc", "link", "from"]);
</script>

<style scoped lang="less">

.main {
	position: relative;
	display: flex;
	box-sizing: border-box;
	flex-flow: column nowrap;
	align-items: flex-start;
	width: 100%;
	border-radius: 10px;
	margin: 20px;
	text-align: left;

	& .title a {
		color: violet;
	}

	& .title {
		margin: 0;
	}

	& .from {
		position: absolute;
		right: 10px;
		bottom: 10px;
	}

	& .link {
		display: block;
		overflow: hidden;
		width: 400px;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
}

</style>
