<template>
    <div class="search">
        <el-row>
            <el-radio-group v-model="select" size="large">
                <el-radio-button label="book">书籍</el-radio-button>
                <el-radio-button label="music">音乐</el-radio-button>
            </el-radio-group>
        </el-row>
        <el-row>
            <el-input v-model="search" @keyup.enter="submit">
                <template #append>
                    <el-button @click="submit">搜索</el-button>
                </template>
            </el-input>
        </el-row>

        <keep-alive>
            <component :is="componentsTab[currentCom]" :datalist="result.book"></component>
        </keep-alive>
    </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BookListCom from '../components/book/BookListCom.vue';
import { httpController, HttpContainer } from '@/controller/http.controller'
import { ElMessage } from 'element-plus';
import { AxiosError } from 'axios';

let search = ref<string>("")
let select = ref<keyof HttpContainer>("book")
let result = ref({
    book: [],
    music: []
})

let currentCom = ref<string>("BookListCom")
let componentsTab: {
    [propName: string]: any
} = {
    BookListCom,
}

async function submit() {
    try {
    let { data } = await httpController.getController(select.value)?.getData(search.value)!
    result.value[select.value] = data
    } catch (error:AxiosError) {
        ElMessage.error(`错误代码:${error.code} ${error.message}`)

    }
}
</script>

<style scoped lang="less">
.el-input {
    width: 50vw;
}
</style>