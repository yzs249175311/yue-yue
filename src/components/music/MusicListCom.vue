<template>
	<el-table :data="datalist" style="width: 80%;">
		<el-table-column prop="name" label="歌曲名" />
		<el-table-column prop="author" label="作者" />
		<el-table-column prop="other.platform" label="平台" />
		<el-table-column label="操作">
			<template #default="scope">
				<el-button type="success" @click="handlePlay(scope.row)" round>播放</el-button>
				<el-button type="primary" @click="handleAdd(scope.row)" round>添加</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script lang="ts" setup>
import { Music } from "@/interface/music/music.interface"
import { useStore } from "@/store/music/music-player"
import { ElMessage } from "element-plus";
import { musichttp } from "@/http/myhttp"

defineProps(["datalist"]);
let store = useStore()
let { addMusic, musicPlayer, setCurrentMusicIndex, setMusicName, setMusicAuthor } = store

let handlePlay = async (music: Music) => {
	let res = null
	if (music.platform == "tonzhon") {
		res = await musichttp.getSource(music.other?.requestlink as string).catch(() => {
			return { data: {success:false}}
		})
	}

	let data =  res?.data
	if (data && data.success) {
		musicPlayer.src = data.data?.songSource as string
		setCurrentMusicIndex(null)
		setMusicName(music.name)
		setMusicAuthor(music.author)
		musicPlayer.play()
	} else {
		ElMessage.error("链接无效,播放失败")
	}
}

let handleAdd = async (music: Music) => {
	let res = null
	if (music.platform == "tonzhon") {
		res = await musichttp.getSource(music.other?.requestlink as string).catch(() => {
			return { data: {success:false}}
		})
	}
	let data =  res?.data
	if (data.success) {
		addMusic({ ...music, ...{ link: data.data?.songSource } })
		ElMessage.success("添加《"+music.name+"》成功")
	} else {
		ElMessage.error("链接无效,添加失败")
	}

}
</script>
