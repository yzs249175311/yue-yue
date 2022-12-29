<template>
	<Teleport to="body">
		<div :class="['music-container', musicPlayerToggle]">
			<div class="controlPanel">
				<el-button type="primary" @click="musicPrev"><font-awesome-icon
						icon="fa-solid fa-backward" /></el-button>
				<el-button type="primary" @click="musicPlayPause" style="width: 100px;">
					<font-awesome-icon icon="fa-solid fa-play" v-show="!musicState" />
					<font-awesome-icon icon="fa-solid fa-pause" v-show="musicState" />
				</el-button>
				<el-button type="primary" @click="musicNext"><font-awesome-icon
						icon="fa-solid fa-forward" /></el-button>
				<el-button type="primary" @click="addCurrentMusic">添加音乐</el-button>
				<el-button type="primary" @click="saveMusicList">保存列表</el-button>
				<el-button type="primary" @click="playMusicList">播放列表</el-button>
			</div>
			<Teleport to="#music-title">
				<div class="title">
					<div class="content" :class="!musicState                                                              ?                                                              'paused'                                                              :                                                              ''">
						{{ musicTitle }}
					</div>
				</div>
			</Teleport>
			<audio ref="musicController">
				<source src="@/assets/回到过去-钢琴版.mp3">
			</audio>
			<font-awesome-icon icon="fa-solid fa-music" class="toggle" style="border:0px;"
				@click="toggleMusicPlayerButton" @mouseenter="musicPlayerToggle = 'open'" />

			<MusicPlayerListComVue v-model:drawer="playMusicListVisible" @playIndex="musicPlay"></MusicPlayerListComVue>
		</div>
	</Teleport>
</template>

<script lang="ts" setup >
import MusicPlayerListComVue from "./MusicPlayerListCom.vue";
import { useStore } from '@/store/music/music-player'
import { Music } from '@/interface/music/music.interface'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onMounted, ref } from 'vue';

import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";

let store = useStore()
let { musicList, musicState, musicTitle, currentMusicIndex, musicName, musicAuthor } = storeToRefs(store)
let { addMusicList, saveMusicList, setMusicPlayer, setCurrentMusicIndex, addMusic } = store

let musicPlayerToggle = ref<"close" | "open">("close")

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

let musicPrev = () => {
	musicPlay(currentMusicIndex.value! - 1)
}

let musicNext = () => {
	musicPlay(currentMusicIndex.value! + 1)
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

addMusicList(JSON.parse(localStorage.getItem("musicList") as string) as Music[])

onMounted(() => {
	setMusicPlayer(musicController.value as HTMLAudioElement)
	musicController.value?.addEventListener("play", () => {
		musicState.value = true
	})
	musicController.value?.addEventListener("ended", () => {
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

.title {
	display: flex;
	overflow-x: hidden;
	margin-left: auto;
	margin-right: 2em;
	padding: 10px 10px;
	max-width: 20em;
	height: 100%;
	outline: none;

	.content {
		font-size: 1.2em;
		white-space: nowrap;
		color: #fff;
		text-shadow: 0 0 1px #03bcf4,
			0 0 2px #03bcf4,
			0 0 5px #03bcf4,
			0 0 9px #03bcf4;
		-webkit-box-reflect: below 0px linear-gradient(transparent, #0009);
		user-select: none;
		animation: titleScroll 10s cubic-bezier(0.1,0.4,0.9,0.6) infinite;
	}

	.content.paused {
		animation-play-state: paused;
	}
}

@keyframes titleScroll {
	from {
		transform: translateX(150%);
		filter: hue-rotate(0);
		-webkit-box-reflect: below 0px linear-gradient(transparent, #0009);
	}

	to {
		transform: translateX(-150%);
		filter: hue-rotate(360deg);
		-webkit-box-reflect: below 0px linear-gradient(transparent, #0009);
	}
}
</style>
