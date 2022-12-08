<template>
	<div class="logo">
		<img src="../assets/logo.png" alt="logo" />
	</div>
	<div class="search">
		<el-row>
			<el-radio-group v-model="select" size="large">
				<el-radio-button label="book">书籍</el-radio-button>
				<el-radio-button label="music">音乐</el-radio-button>
			</el-radio-group>
		</el-row>
		<el-row>
			<el-input v-model="search" @keyup.enter="submit">
				<template #append>
					<el-button @click="submit" :disabled="submit_disabled">搜索</el-button>
				</template>
			</el-input>
		</el-row>
	</div>
	<keep-alive>
		<component :is="componentsTab[select]" :datalist="result[select]"></component>
	</keep-alive>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import BookListCom from "../components/book/BookListCom.vue";
import MusicListCom from "../components/music/MusicListCom.vue"
import { httpController, HttpContainer } from "@/controller/http.controller";
import { ElMessage } from "element-plus";

let submit_disabled = ref<boolean>(false);
let search = ref<string>("");
let select = ref<keyof HttpContainer>("book");
let result = ref({
	book: [],
	music: [],
});

let componentsTab: {
	[propName: string]: any;
} = {
	book: BookListCom,
	music: MusicListCom,
};

async function submit() {
	try {
		submit_disabled.value = true;
		let { data } = await httpController
			.getController(select.value)
			?.getData(search.value)!;
		result.value[select.value] = data;
	} catch (error: any) {
		ElMessage.error(`错误代码:${error.code} ${error.message}`);
	} finally {
		submit_disabled.value = false;
	}
}

</script>

<style scoped lang="less">
.search .el-input {
	width: 50vw;
}

.logo>img {
	width: 40%;
}
</style>
