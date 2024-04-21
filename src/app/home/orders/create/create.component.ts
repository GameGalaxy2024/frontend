import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { OrderService } from '../../../services/order.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-order',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public products:any;
  public currentProducts:any[] = [];
  public total = 0;
  public email:string = '';
  public userName:string = '';
  public user:string = '';
  public address:string = '';
  ngOnInit(): void {

    this.email = sessionStorage.getItem('email') || '';
    this.userName = sessionStorage.getItem('username') || '';
    this.user = sessionStorage.getItem('userId') || '';
    this.products = sessionStorage.getItem('productsSelected');
    this.products = JSON.parse(this.products);
  }

  constructor( private productSvc:ProductsService, private ordersSvc:OrderService, private router:Router){}

  getProducts(){
    this.productSvc.getProducts()
        .subscribe({
          error:(err:any) => {
            console.log(err);
          },
          next:(resp:any) => {
            this.currentProducts = resp.products
          }
        });
  };

  createOrder(){
    const data = {
      user:this.user,
      customerName: this.userName,
      customerEmail: this.email,
      shippingAddress: this.address,
      products: this.products
    };

    this.ordersSvc.createOrder(data)
          .subscribe({
            error:(err:any) => {
              console.log(err);
              Swal.fire('Ooops', err.error.message, 'error');
            },
            next:(resp:any) => {
              Swal.fire('Èxito', 'Orden de compra generada', 'success');
              this.router.navigateByUrl('/home/orders')
            }
          });
  };


}
