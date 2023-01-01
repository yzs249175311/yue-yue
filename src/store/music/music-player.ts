import { defineStore } from "pinia"
import { Music } from "@/interface/music/music.interface"
import { formatTime } from "@/utils/formatTime"
import { ElMessage } from "element-plus"

export const useStore = defineStore("music-player", {
	state: () => ({
		musicList: [] as Music[],
		musicPlayer: {} as HTMLAudioElement,
		currentMusicIndex: null as (number | null),
		musicName: "未知" as string,
		musicAuthor: "未知" as string,
		musicState: false,
		playMusicListVisible:false,
		currentTime: 0,
		duration: 0,
	}),
	getters: {
		musicTitle: function (): string {
			if (this.musicList.length == 0) {
				return "未知" + " -- " + "未知"
			} else {
				return this.musicName + "--" + this.musicAuthor
			}
		},
		currentTimeFormat: function (): string {
			return formatTime(this.currentTime)
		},
		durationFormat: function (): string {
			return formatTime(this.duration)
		}
	},
	actions: {
		addMusic(item: Music) {
			this.musicList.push(<Music>item)
			this.saveMusicList()
		},
		deleteMusic(index: number) {
			this.musicList.splice(index, 1)
			this.saveMusicList()
		},
		addMusicList(itemList: Music[]) {
			if (!itemList || itemList?.length == 0 || this.musicList.length != 0) {
				return
			}
			itemList.forEach((item: Music) => {
				this.musicList.push(item)
			})
		},
		saveMusicList() {
			localStorage.setItem("musicList", JSON.stringify(this.musicList))
		},

		setMusicPlayer(player: HTMLAudioElement) {
			this.musicPlayer = player
		},
		setCurrentMusicIndex(index: null | number) {
			this.currentMusicIndex = index
		},
		setMusicName(name: string) {
			this.musicName = name
		},
		setMusicAuthor(author: string) {
			this.musicAuthor = author
		},
		playMusic(music: number | Music | null) {
			let currentMusic = null
			if (typeof music == "number") {
				currentMusic = this.musicList[music]
				this.setCurrentMusicIndex(music)
			} else if (music?.link) {
				currentMusic = music
				this.setCurrentMusicIndex(null)
			}

			if (currentMusic) {
				this.musicPlayer.src = currentMusic.link
				this.setMusicName(currentMusic.name)
				this.setMusicAuthor(currentMusic.author)
			}

			this.musicPlayer.play().catch(() => {
				ElMessage.error("链接有误，播放失败!")
				this.musicState = false
			})
		}
	}
})
