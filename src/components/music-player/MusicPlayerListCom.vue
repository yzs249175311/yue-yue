<template>

		<el-drawer v-model="drawer" title="播放列表" direction="ltr" :before-close="handleClose" :append-to-body="true">
			<el-table :data="musicList" style="width: 100%">
				<el-table-column prop="name" label="歌曲" />
				<el-table-column prop="author" label="作者" />
				<el-table-column label="操作">
					<template #default="scope">
						<el-button size="small" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
						<el-button size="small" tyep="primary" @click="handlePlay(scope.$index)">播放</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-drawer>
	
</template>

<script lang="ts" setup>
import { useStore } from "@/store/music/music-player"
import { toReactive } from "@vueuse/shared";

defineProps(["drawer"])
let emits = defineEmits(["update:drawer", "playIndex"])

let { musicList, deleteMusic, saveMusicList } = toReactive(useStore())

let handleClose = (done: () => void) => {
	emits("update:drawer", false)
	saveMusicList()
	done()
}
let handleDelete = (index: number) => {
	deleteMusic(index)
}

let handlePlay = (index: number) => {
	emits("playIndex", index)
}
</script>

<style lang="less" scoped>

</style>
