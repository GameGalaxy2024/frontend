import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.css']
})
export class ProductSummaryComponent {
  public products:any;
  public currentProducts:any[] = [];
  public total = 0;

  ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
    this.getProducts();

    this.products = sessionStorage.getItem('productsSelected');
    this.products = JSON.parse(this.products);
    this.getTotal()
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

  findProductName(p:string){
    const name = this.currentProducts.find( c => c._id == p);
    return name?.name
  };

  getTotal(){
    this.total = this.products.reduce((sum:any, item:any) => sum + (item.price * item.quantity), 0);
  };
}
