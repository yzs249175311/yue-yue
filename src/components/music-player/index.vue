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

			<MusicPlayerListComVue v-model:drawer="playMusicListVisible" @playIndex="musicPlay"></MusicPlayerListComVue>
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
let { musicList, musicState, currentMusicIndex, musicName, musicAuthor, currentTime, duration, currentTimeFormat, durationFormat } = storeToRefs(store)
let { addMusicList, saveMusicList, setMusicPlayer, setCurrentMusicIndex, addMusic } = store

let musicPlayerToggle = ref<"close" | "open">("close")

let musicController = ref<HTMLAudioElement>()
let playMusicListVisible = ref(false)

let setCurrentTime = (e: Event) => {
	musicController.value!.currentTime = currentTime.value
}

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


onMounted(() => {
	setMusicPlayer(musicController.value as HTMLAudioElement)

	addMusicList(JSON.parse(localStorage.getItem("musicList") as string) as Music[])

	musicController.value?.addEventListener("play", () => {
		musicState.value = true
	})
	musicController.value?.addEventListener("ended", () => {
		musicState.value = false
	})
	musicController.value?.addEventListener("loadeddata", ()=>{
		duration.value = musicController.value!.duration
	})
	musicController.value?.addEventListener("timeupdate", (e:Event)=>{
		currentTime.value = (<HTMLAudioElement>e.currentTarget).currentTime
	})
})

</script>

<style lang="scss" scoped>
.music-container {
	display: grid;
	align-items: center;
	grid-template-columns: repeat(3, 1fr);
	position: fixed;
	bottom: 0;
	width: 100%;
	padding: 20px;
	overflow: auto;
	resize: both;
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
