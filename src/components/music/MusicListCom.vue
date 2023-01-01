<template>

	<el-table :data="datalist" style="width: 80%;"  :highlight-current-row="true" @row-dblclick="handlePlay">
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
import { httpController } from "@/controller/http.controller"

defineProps(["datalist"]);
let store = useStore()
let { addMusic, musicPlayer, setCurrentMusicIndex, setMusicName, setMusicAuthor } = store

let handlePlay = async (music: Music) => {
	httpController.getController("music").cancel()

	let {data} = await httpController.getController("music").formatData!(music)

	if (data && data.success) {
		music = data?.music
		musicPlayer.src = music.link
		setCurrentMusicIndex(null)
		setMusicName(music.name)
		setMusicAuthor(music.author)
		musicPlayer.play()
	} else if(data?.message){
		//有message说明不是取消请求造成的
		ElMessage.error("链接无效,播放失败")
	} 
}

let handleAdd = async (music: Music) => {

	let {data} = await httpController.getController("music").formatData!(music)

	if (data.success) {
		music = data?.music
		addMusic(music)
		ElMessage.success("添加《" + music.name + "》成功")
	} else {
		ElMessage.error("链接无效,添加失败")
	}

}

</script>
