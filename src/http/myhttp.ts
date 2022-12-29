import axios from 'axios'
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, } from "axios";

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
	
}

class BookHttp implements IHttpClass {

	private axios: AxiosInstance

	constructor(option: AxiosRequestConfig) {
		this.axios = axios.create(option)
	}


	getData(bookName: string): Promise<AxiosResponse<any, any>> {
		return this.axios({
			url: `books/search`,
			params: {
				bookName,
			},
		});
	}
}

class MusicHttp implements IHttpClass {

	private axios: AxiosInstance

	constructor(option: AxiosRequestConfig) {
		this.axios = axios.create(option)
	}

	getData(musicName: string): Promise<AxiosResponse<any, any>> {
		return this.axios({
			url: `music/search`,
			params: {
				musicName,
			},
		});
	}

	getSource(link: string) {
		return this.axios({
			url: `music/getSource`,
			params: {
				link,
			},
		})
	}
}

export let bookhttp = new BookHttp(option)
export let musichttp = new MusicHttp(option)
