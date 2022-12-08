import {bookhttp,musichttp, IHttpClass} from "@/http/myhttp"

export interface HttpContainer{
    book?:IHttpClass
    music?:IHttpClass
}

class HttpController{
    httpContainer: HttpContainer = {}
    constructor(bookhttp:IHttpClass,musichttp:IHttpClass){
        this.httpContainer.book = bookhttp
        this.httpContainer.music = musichttp
    }

    getController(type: keyof(HttpContainer)){
        return this.httpContainer[type]
    }
}

export let httpController = new HttpController( bookhttp,musichttp )
