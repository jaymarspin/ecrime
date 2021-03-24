import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http'
import "rxjs"
import "rxjs-compat"
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class RequestService {
  server: string = environment.apiUrl;

  
  constructor(public http: Http) { }
  postData(file,body){
    let type = "application/json; charset=UTF-8"
    
    let headers = new Headers({'Content-Type': type
  })
    let options = new RequestOptions({headers: headers})

    return this.http.post(this.server + file, JSON.stringify(body), options).map(res => res)
  
  }

  getData(file){
    
    return this.http.get(this.server+file) 
  }
}
