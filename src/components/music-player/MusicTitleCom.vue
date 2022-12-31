<template>

        <div class="title">
            <div class="content"
                :class="!musicState ? 'paused' : ''">
                {{ musicTitle }}
            </div>
        </div>
    
</template>
<script setup lang="ts">
import { useStore } from '@/store/music/music-player'
import { storeToRefs } from "pinia";

let store = useStore()
let { musicState, musicTitle } = storeToRefs(store)

let props = defineProps({
    fontSize: {
        default: "1em",
        type: String,
    },
})

</script>
<style scoped lang="scss">
.title {
	display: flex;
	overflow-x: hidden;
	padding: 10px 10px;
	width: 100%;
	outline: none;
    justify-content: center;
    align-items: center;
    height: calc(2 * v-bind(fontSize));
	.content {
        font-size: v-bind(fontSize);
		white-space: nowrap;
		color: #fff;
        width: 100%;
		text-shadow: 0 0 1rem #03bcf4,
			0 0 2rem #03bcf4,
			0 0 3rem #03bcf4,
			0 0 4rem #03bcf4;
		user-select: none;
		animation: titleScroll 10s linear infinite;
	}

	.content.paused {
		animation-play-state: paused;
	}
}

@keyframes titleScroll {
	from {
		transform: translateX(100%);
		filter: hue-rotate(0);
	}

	to {
		transform: translateX(-100%);
		filter: hue-rotate(360deg);
	}
}
</style>