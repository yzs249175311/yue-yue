import { httpController } from '@/controller/http.controller';
import axios from 'axios'
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, } from "axios";
import { Music } from "@/interface/music/music.interface"
//const book_baseurl = "http://localhost:3000/";
export let baseURL: string = "http://localhost:3000/"
baseURL = "https://my-site-server-bay.vercel.app/";

if (process.env.NODE_ENV === 'production') {
	baseURL = "https://my-site-server-bay.vercel.app/";
}

let option: AxiosRequestConfig = {
	baseURL,
}


export interface IHttpClass {

	getData(name: string): Promise<AxiosResponse<any, any>>;
	getSource?(link: string): Promise<AxiosResponse<any, any>>;
	cancel(): void;
	formatData?(music: Music): any;
}

class BookHttp implements IHttpClass {

	private axios: AxiosInstance
	private abortController: AbortController

	constructor(option: AxiosRequestConfig) {
		this.abortController = new AbortController()
		this.axios = axios.create(option)
	}


	getData(bookName: string): Promise<AxiosResponse<any, any>> {
		return this.axios({
			url: `books/search`,
			params: {
				bookName,
			},
			signal: this.abortController.signal
		});
	}

	cancel(): void {
		this.abortController.abort()
	}
}

class MusicHttp implements IHttpClass {

	private axios: AxiosInstance
	private abortController: AbortController

	constructor(option: AxiosRequestConfig) {
		this.abortController = new AbortController()
		this.axios = axios.create(option)
	}

	getData(musicName: string): Promise<AxiosResponse<any, any>> {
		return this.axios({
			url: `music/search`,
			params: {
				musicName,
			},
			signal: this.abortController.signal
		});
	}

	getSource(link: string) {
		return this.axios({
			url: `music/getSource`,
			params: {
				link,
			},
			signal: this.abortController.signal
		})
	}

	cancel(): void {
		this.abortController.abort()
		this.abortController = new AbortController()
	}

	async formatData(music: Music) {
		if (music.other?.requestlink) {
			let {data} = await this.getSource(music.other?.requestlink!).catch(()=>{
				return {data:{ success:false }}
			})
			if(data && data.success){
				return Promise.resolve({
					data:{
						success:true,
						music:{
							...music,
							...{
								link:data.data.songSource
							}
						}
					}
				})
			}else{
				return Promise.resolve({ data:data })
			}
		}
		return Promise.resolve({
			data: {
				success: true,
				music:music, 
			}
		})
	}
}

export let bookhttp = new BookHttp(option)
export let musichttp = new MusicHttp(option)
