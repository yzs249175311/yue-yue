<template>
	<Teleport to="body">
		<div :class="['music-container', musicPlayerToggle]">
			<el-button type="primary">上一首</el-button>
			<el-button type="primary" @click="musicPlayPause">
				{{ musicState ? "暂停" : "播放" }}
			</el-button>
			<el-button type="primary">下一首</el-button>
			<el-button type="primary" @click="dialogVisible = !dialogVisible">添加音乐</el-button>
			<el-button type="primary" @click="saveMusicList">保存列表</el-button>
			<el-button type="primary" @click="playMusicList">播放列表</el-button>
			<span class="title">
				{{  musicTitle  }}
			</span>
			<audio ref="musicController">
				<source src="@/assets/回到过去-钢琴版.mp3">
			</audio>

			<font-awesome-icon icon="fa-solid fa-circle" class="toggle" style="border:0px;"
				@click="toggleMusicPlayerButton" />


			<MusicListComVue v-model:drawer="playMusicListVisible" @playIndex="musicPlay"></MusicListComVue>
		</div>
	</Teleport>
</template>

<script lang="ts" setup >
import MusicListComVue from "./MusicListCom.vue";
import { useStore } from '@/store/music/music-player'
import { Music } from '@/interface/music/music.interface'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onMounted, ref } from 'vue';

import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";

let store = useStore()
let { musicList, musicState, musicTitle } = storeToRefs(store)
let { addMusicList, saveMusicList, setMusicPlayer, setCurrentMusicIndex } = store

let musicPlayerToggle = ref<"close" | "open">("close")

let dialogVisible = ref(false)
let musicController = ref<HTMLAudioElement>()
let playMusicListVisible = ref(false)
let toggleMusicPlayerButton = function () {
	if (musicPlayerToggle.value == "close") {
		musicPlayerToggle.value = "open"
	} else {
		musicPlayerToggle.value = "close"
	}
}

let musicPlayPause = () => {
	musicState.value ? musicPause() : musicPlay()
}

let musicPlay = (index: number | null = null) => {
	let audio: HTMLAudioElement = musicController.value!


	if (index != null && musicList.value[index]?.link) {
		audio.src = musicList.value[index].link
		setCurrentMusicIndex(index)
	}

	audio.play().catch(() => {
		ElMessage.error("链接有误，播放失败!")
		musicState.value = false
	})
}

let musicPause = () => {
	let audio: HTMLAudioElement = musicController.value!
	musicState.value = false
	audio.pause()
}

let playMusicList = () => {
	playMusicListVisible.value = true
}

addMusicList(JSON.parse(localStorage.getItem("musicList") as string) as Music[])

onMounted(() => {
	setMusicPlayer(musicController.value as HTMLAudioElement)
	 musicController.value?.addEventListener("play",() => {
		 musicState.value = true
	})
	 musicController.value?.addEventListener("ended",() => {
		 musicState.value = false
	})
})

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
	z-index: 999;
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
