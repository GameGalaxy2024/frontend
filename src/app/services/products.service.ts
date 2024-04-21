import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public base_url:string = environment.base_url;

  get header() {
    return {
      headers: {
        'Authorization': `${sessionStorage.getItem('accessToken')}`
      }
    }
  }
  constructor(private http:HttpClient) { }

  getProducts(){
    const url = `${this.base_url}/products`;
    return this.http.get(url, this.header);
  };

  createProduct(data:{}){
    const url = `${this.base_url}/products`;
    return this.http.post(url, data, this.header);
  }

  updateProduct(data:{}, id:string){
    const url = `${this.base_url}/products/${id}`;
    return this.http.put(url, data, this.header);
  };

  deleteProduct(productId:string){
    const url = `${this.base_url}/products/${productId}`;
    return this.http.delete(url,  this.header);
  };


}
