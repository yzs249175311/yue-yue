import axios from 'axios'
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, } from "axios";

//const book_baseurl = "http://localhost:3000/";
let book_baseurl:string = ""
if( process.env.NODE_ENV === 'production'){
	book_baseurl = "https://my-site-server-bay.vercel.app/";
}else{
	book_baseurl = "http://localhost:3000/";
}

export abstract class IHttpClass {
  axios: AxiosInstance
  constructor(option:AxiosRequestConfig){
    this.axios = axios.create(option);
  };

  abstract request(option: AxiosRequestConfig):Promise<AxiosResponse<any, any>>;

  abstract getData(name:string): Promise<AxiosResponse<any,any>>;
}

class BookHttp extends IHttpClass {
  constructor(option: AxiosRequestConfig) {
    super(option)
  }

  request(option: AxiosRequestConfig): Promise<AxiosResponse<any, any>> {
    return this.axios(option);
  }

  getData(bookName: string): Promise<AxiosResponse<any, any>> {
    return bookhttp.request({
      url: `books/search`,
      params: {
        bookName,
      },
    });
  }
}


export let bookhttp = new BookHttp({baseURL:book_baseurl})
