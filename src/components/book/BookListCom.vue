<template>
	<div id="main">
		<div class="select_data">
			<el-checkbox-group v-model="data_group">
				<el-checkbox :label="item" size="large" v-for="item in data_from_list">{{ item }} </el-checkbox>
			</el-checkbox-group>
		</div>
		<BookItemCom :="item" v-for="item in filter_datalist"></BookItemCom>
	</div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch, watchEffect } from "vue";
import BookItemCom from "./BookItemCom.vue";
import { Book } from "@/interface/book/book.interface";

let props = defineProps(["datalist"]);
let data_group = ref<string[]>([]);
let data_from_list = ref<string[]>([]);

let filter_datalist = computed(() => {
	return props.datalist?.filter((item: Book) => {
		if (data_group.value.includes(item.from as string)) {
			return true
		}
		return false
	})
})

watch(props.datalist, () => {
	data_from_list.value.splice(0)
	data_group.value.splice(0)
	props.datalist.forEach((item: Book) => {
		if (!data_from_list.value.includes(item.from as string)) {
			data_from_list.value.push(item.from as string);
			data_group.value.push(item.from as string)
		}
	});
})

watchEffect(() => {
	props.datalist.forEach((item: Book) => {
		if (!data_from_list.value.includes(item.from as string)) {
			data_from_list.value.push(item.from as string);
			data_group.value.push(item.from as string)
		}
	});
})



</script>

<style lang="less" scoped>

#main {
	width: 80vw;
}

.select_data {
	display: flex;
	justify-content: flex-start;
}

</style>
