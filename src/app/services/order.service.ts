import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public base_url:string = environment.base_url;

  get header() {
    return {
      headers: {
        'Authorization': `${sessionStorage.getItem('accessToken')}`
      }
    };
  };

  constructor(private http:HttpClient) { }

  getOrders(id:string){
    const url = `${this.base_url}/orders/${id}`;
    return this.http.get(url, this.header);
  };
  getAdminOrders(){
    const url = `${this.base_url}/orders`;
    return this.http.get(url, this.header);
  };

  createOrder(data:{}){
    const url = `${this.base_url}/orders`;
    return this.http.post(url, data, this.header);
  }

  updateOrder(data:{}, id:string){
    const url = `${this.base_url}/orders/${id}`;
    return this.http.put(url, data, this.header);
  };

  deleteOrder(orderId:string){
    const url = `${this.base_url}/orders/${orderId}`;
    return this.http.delete(url,  this.header);
  };
}
