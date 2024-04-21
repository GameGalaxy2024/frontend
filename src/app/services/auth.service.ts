import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public base_url:string = environment.base_url;

  get header() {
    return {
      headers: {
        'Authorization': `${sessionStorage.getItem('accessToken')}`
      }
    }
  }
  constructor(private http:HttpClient) { }


  // login service
  login(data:{}){
    const url = `${this.base_url}/login`;
    return this.http.post(url, data);
  };

  // register service
  register(data:{}){
    const url = `${this.base_url}/register`;
    return this.http.post(url, data);
  };

  // logout service
  logout(){
    const url = `${this.base_url}/logout`;
    return this.http.post(url, {}, this.header);
  };

  // profile info
  getMyInfo(){
    const url = `${this.base_url}/profile`;
    return this.http.get(url, this.header);
  };

}
