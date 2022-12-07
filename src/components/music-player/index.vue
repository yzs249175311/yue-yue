<template>
	<div :class="['music-container', musicPlayerToggle]">
		<el-button type="primary">上一首</el-button>
		<el-button type="primary" @click="musicPlayPause">
			{{ playerState ? "暂停" : "播放" }}
		</el-button>
		<el-button type="primary">下一首</el-button>
		<el-button type="primary" @click="dialogVisible = !dialogVisible">添加音乐</el-button>
		<el-button type="primary" @click="saveMusicList">保存列表</el-button>
		<el-button type="primary" @click="playMusicList">播放列表</el-button>

		<audio ref="musicController" controls autoplay>
			<source src="@/assets/回到过去-钢琴版.mp3">
		</audio>

		<font-awesome-icon icon="fa-solid fa-circle" class="toggle" style="border:0px;"
			@click="toggleMusicPlayerButton" />

		<AddMusicDialogCom v-model:dialogVisible="dialogVisible"></addMusicDialogCom>
		<MusicListComVue v-model:drawer="playMusicListVisible" @playIndex="musicPlay"></MusicListComVue>
	</div>
</template>

<script lang="ts" setup >
import AddMusicDialogCom from "@/components/music-player/AddMusicDialogCom.vue"
import MusicListComVue from "./MusicListCom.vue";
import { useStore } from '@/store/music/music-player'
import { Music } from '@/interface/music/music.interface'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';

import axios from "axios";
import { toReactive } from "@vueuse/shared";
import { ElMessage } from "element-plus";

let store = useStore()
let { musicList, addMusicList, saveMusicList } = toReactive(store)
let musicPlayerToggle = ref<"close" | "open">("close")
let currentMusicIndex = ref(0)

let dialogVisible = ref(false)
let musicController = ref(null)
let playerState = ref(false)
let playMusicListVisible = ref(false)

let toggleMusicPlayerButton = function () {
	if (musicPlayerToggle.value == "close") {
		musicPlayerToggle.value = "open"
	} else {
		musicPlayerToggle.value = "close"
	}
}

let musicPlayPause = () => {
	playerState.value ? musicPause() : musicPlay()
}

let musicPlay = async (index: number = 0) => {
	let audio: HTMLAudioElement = musicController.value!
	let res = null;
	if (musicList[index]?.link) {
		res = await axios.get(musicList[index].link, { timeout: 5000 }).catch(() => {
			ElMessage.error("链接失效！")
			console.log(musicList[index].link)
			return false
		});
	}

	if (res) {
		audio.src = musicList[index].link
		currentMusicIndex.value = index
	}

	await audio.play()
	playerState.value = true
}

let musicPause = () => {
	let audio: HTMLAudioElement = musicController.value!
	playerState.value = false
	audio.pause()
}

let playMusicList = () => {
	playMusicListVisible.value = true
}

addMusicList(JSON.parse(localStorage.getItem("musicList") as string) as Music[])

</script>

<style lang="less" scoped>
.music-container {
	display: flex;
	align-items: center;
	position: fixed;
	bottom: 0;
	width: 100%;
	padding: 20px;
	overflow: auto;
	resize: both;
	transition: all 0.4s ease;

	& .toggle {
		position: absolute;
		cursor: pointer;
		left: 50%;
		top: 0;
	}

	&.open {
		transform: translateY(0);

		.toggle {
			color: red;
		}
	}

	&.close {
		transform: translateY(85%);
	}
}
</style>
