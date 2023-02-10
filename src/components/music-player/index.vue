<template>
	<Teleport to="body">
		<div :class="['music-container', musicPlayerToggle]">
			<div class="controlPanel">
				<el-button type="primary" @click="musicPrev" size="large" circle><font-awesome-icon
																					 icon="fa-solid fa-backward" /></el-button>
				<el-button type="primary" class="musicPlayPause" @click="musicPlayPause" size="large" circle>
					<font-awesome-icon icon="fa-solid fa-play" v-show="!musicState" />
					<font-awesome-icon icon="fa-solid fa-pause" v-show="musicState" />
				</el-button>
				<el-button type="primary" @click="musicNext" size="large" circle><font-awesome-icon
																					 icon="fa-solid fa-forward" /></el-button>
				<el-button type="primary" @click="addCurrentMusic">添加音乐</el-button>
				<el-button type="primary" @click="saveMusicList">保存列表</el-button>
				<el-button type="primary" @click="playMusicList">播放列表</el-button>
				<el-button type="primary" @click="downloadMusic" :disabled="downloadMusicBtnFlag">下载音乐</el-button>
			</div>

			<div class="timePanel">
				<el-slider v-model="currentTime" :max="duration" @input="setCurrentTime" :format-tooltip="formatTime" />
				<div class="showtime">
					<time>{{ currentTimeFormat }}</time>
					<time>{{ durationFormat }}</time>
				</div>
			</div>

			<audio ref="musicController">
				<source src="@/assets/回到过去-钢琴版.mp3">
			</audio>
			<font-awesome-icon icon="fa-solid fa-music" class="toggle" @click="toggleMusicPlayerButton"
							   @mouseenter="musicPlayerToggle = 'open'" />

			<MusicPlayerListComVue></MusicPlayerListComVue>
		</div>
	</Teleport>
</template>

<script lang="ts" setup >
 import MusicPlayerListComVue from "./MusicPlayerListCom.vue";
 import { useStore } from '@/store/music/music-player'
 import { Music } from '@/interface/music/music.interface'
 import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
 import { onMounted, ref, reactive } from 'vue';
 import { formatTime } from "@/utils/formatTime"

 import { ElMessage } from "element-plus";
 import { storeToRefs } from "pinia";

 let store = useStore()
 let { musicList, musicState, currentMusicIndex, musicName, musicAuthor, currentTime, duration, currentTimeFormat, durationFormat, playMusicListVisible } = storeToRefs(store)
 let { playMusic, addMusicList, saveMusicList, setMusicPlayer, setCurrentMusicIndex, addMusic } = store

 let musicPlayerToggle = ref<"close" | "open">("close")

 let musicController = ref<HTMLAudioElement>()

 let downloadMusicBtnFlag = ref<boolean>(false)

 let setCurrentTime = (e: Event) => {
	 musicController.value!.currentTime = currentTime.value
 }

 let toggleMusicPlayerButton = function () {
	 musicPlayerToggle.value = musicPlayerToggle.value == "close" ? "open" : "close"
 }

 let musicPlayPause = () => {
	 musicState.value ? musicPause() : musicPlay()
 }

 let musicPlay = (index: number | null = null) => {
	 playMusic(index)
 }

 let musicPause = () => {
	 let audio: HTMLAudioElement = musicController.value!
	 musicState.value = false
	 audio.pause()
 }

 let musicPrev = () => {
	 if(currentMusicIndex.value){
		 playMusic(currentMusicIndex.value! - 1)
	 }
 }

 let musicNext = () => {
	 if(currentMusicIndex.value){
		 playMusic(currentMusicIndex.value! + 1)
	 }
 }

 let playMusicList = () => {
	 playMusicListVisible.value = true
 }

 let addCurrentMusic = () => {
	 if (musicName.value && musicAuthor.value && musicController.value?.src) {
		 addMusic({
			 name: musicName.value,
			 author: musicAuthor.value,
			 link: musicController.value!.src,
		 })
		 ElMessage.success("添加成功")
	 } else {
		 ElMessage.error("添加失败")
	 }
 }

 //下载正在播放的歌曲
 let downloadMusic = async () => {
	 downloadMusicBtnFlag.value = true
	 let url = musicController.value?.src
	 if((window as any).showSaveFilePicker && url){
		 try {
			 let res = await fetch(url)
			 let data = await res.blob()

			 if(data.size != 0){
				 let opt = {
					 //建议名字
					 suggestedName:musicName.value + " - " + musicAuthor.value +".mp4",
					 type:{
						 accept:"video/mp4"
					 }
				 }
				 let fileHandle = await (window as any).showSaveFilePicker(opt)
				 let stream = await fileHandle.createWritable()
				 await stream.write(data)
				 await stream.close()
				 ElMessage.success("下载成功")
			 }else{
				 ElMessage.info("无法下载")
			 }
		 } catch (err) {
			 ElMessage.error("下载失败")
			 downloadMusicBtnFlag.value = false
		 }
	 }
	 downloadMusicBtnFlag.value = false
 }

 onMounted(() => {
	 setMusicPlayer(musicController.value as HTMLAudioElement)

	 addMusicList(JSON.parse(localStorage.getItem("musicList") as string) as Music[])

	 musicController.value?.addEventListener("play", () => {
		 musicState.value = true
	 })
	 musicController.value?.addEventListener("ended", () => {
		 musicState.value = false
	 })
	 musicController.value?.addEventListener("loadeddata", () => {
		 duration.value = musicController.value!.duration
	 })
	 musicController.value?.addEventListener("timeupdate", (e: Event) => {
		 currentTime.value = (<HTMLAudioElement>e.currentTarget).currentTime
	 })
 })

</script>

<style lang="scss" scoped>
 $bdcolor: #d3d3d3a3;

 .music-container {
	 display: grid;
	 align-items: center;
	 grid-template-columns: repeat(3, 1fr);
	 position: fixed;
	 bottom: 0;
	 width: 100%;
	 padding: 20px;
	 overflow: visible;
	 background-image: linear-gradient(to top, #fff, #f3f3f3, #fff);
	 border-top: 1px solid $bdcolor;
	 z-index: 999;
	 transition: all 0.4s ease;

	 .controlPanel {
		 display: grid;
		 place-items: center;
		 grid-template-columns: repeat(3, 100px);
		 grid-gap: 10px;
	 }

	 .timePanel {
		 width: 100%;
		 display: flex;
		 flex-flow: column nowrap;

		 .showtime {
			 display: flex;
			 justify-content: space-between;
		 }
	 }

	 .toggle {
		 position: absolute;
		 cursor: pointer;
		 left: 5%;
		 top: 0;
		 transform: translateY(-99%);
		 padding: 10px;
		 background-color: #fff;
		 border: 1px solid $bdcolor;
		 border-bottom: 0;
		 border-radius: 5px 5px 0 0;
	 }

	 &.open {
		 transform: translateY(0);

		 .toggle {
			 color: red;
		 }
	 }

	 &.close {
		 transform: translateY(100%);
	 }

 }
</style>
