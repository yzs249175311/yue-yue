import {bookhttp, IHttpClass} from "@/http/myhttp"

export interface HttpContainer{
    book?:IHttpClass
}

class HttpController{
    httpContainer: HttpContainer = {}
    constructor(bookhttp:IHttpClass){
        this.httpContainer.book = bookhttp
    }

    getController(type: keyof(HttpContainer)){
        return this.httpContainer[type]
    }
}

export let httpController = new HttpController(bookhttp)