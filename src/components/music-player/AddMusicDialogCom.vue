<template>
	<Teleport to="body">
		<el-dialog v-model="dialogVisible" title="添加音乐" width="30%" :before-close="handleClose" >

			<el-form :model="musicForm" label-width="auto" label-position="left">
				<el-form-item label="音乐名:">
					<el-input v-model="musicForm.name"></el-input>
				</el-form-item>
				<el-form-item label="作者:">
					<el-input v-model="musicForm.author" aria-placeholder="none"></el-input>
				</el-form-item>
				<el-form-item label="链接:">
					<el-input v-model="musicForm.link"></el-input>
				</el-form-item>
			</el-form>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="$emit('update:dialogVisible', false)">取消</el-button>
					<el-button type="primary" @click="handleConfirm"> 确定 </el-button>
				</span>
			</template>

		</el-dialog>
	</Teleport>
</template>

<script lang="ts" setup>
import { ElMessageBox } from 'element-plus';
import { reactive } from 'vue';
import { Music } from '@/interface/music/music.interface'
import {useStore} from '@/store/music/music-player'

defineProps(['dialogVisible'])
let emits = defineEmits(['update:dialogVisible'])
let {addMusic} = useStore()
let musicForm = reactive<Music>({
	name: "",
	author: "",
	link: "",
})

const handleClose = (done: () => void) => {
	ElMessageBox.confirm('Are you sure to close this dialog?')
		.then(() => {
			done()
		})
		.catch(() => {
			// catch error
		})
}

const handleConfirm = () => {
	addMusic(musicForm)
	emits("update:dialogVisible", false)
}

</script>

<style lang="less" scoped>

</style>
