import { defineStore } from "pinia"
import { Music } from "@/interface/music/music.interface"
import {formatTime} from "@/utils/formatTime"

export const useStore = defineStore("music-player", {
	state: () => ({
		musicList: [] as Music[],
		musicPlayer: {} as HTMLAudioElement,
		currentMusicIndex: null as (number | null),
		musicName: "未知" as string,
		musicAuthor: "未知" as string,
		musicState: false,
		currentTime: 0,
		duration: 0,
	}),
	getters: {
		musicTitle: function (): string {
			if (this.currentMusicIndex == null || (this.musicList.length == 0)) {
				return this.musicName + " -- " + this.musicAuthor
			} else {
				return this.musicList[this.currentMusicIndex].name + "--" + this.musicList[this.currentMusicIndex].author
			}
		},
		currentTimeFormat: function(): string{
			return formatTime(this.currentTime)
		},
		durationFormat: function(): string{
			return formatTime(this.duration)
		}
	},
	actions: {
		addMusic(item: Music) {
			this.musicList.push(<Music>item)
		},
		deleteMusic(index: number) {
			this.musicList.splice(index, 1)
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
		}
	}
})
