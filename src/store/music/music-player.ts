import { defineStore } from "pinia"
import { Music } from "@/interface/music/music.interface"

export const useStore = defineStore("main", {
	state: () => ({
		musicList: [] as Music[]
	}),

	actions: {
		addMusic(item: Music) {
			this.musicList.push(<Music>item)
		},
		deleteMusic(index: number) {
			this.musicList.splice(index, 1)
		},
		addMusicList(itemList: Music[]) {
			if (!itemList || itemList?.length == 0) {
				return
			}
			itemList.forEach((item:Music )=> {
				this.musicList.push(item)
			})
		},
		saveMusicList() {
			localStorage.setItem("musicList",JSON.stringify(this.musicList))
		}
	}
})
