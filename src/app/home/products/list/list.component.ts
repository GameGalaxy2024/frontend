import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public products:any[] = [];
  public productSelected:any[] = [];
  public totalProducts:number = 0;
  public isAdmin : boolean = false;
  public selectedId:string = '';
  public quantity:number = 0
  ngOnInit(): void {
    this.isAdmin = sessionStorage.getItem('isAdmin') == 'true' ? true : false || false;

    this.getProducts();
  }

  constructor(private productSvc:ProductsService, private router:Router) {}


  getProducts(){
    this.productSvc.getProducts()
          .subscribe({
            error:(err:any) => {
              console.log(err);
            },
            next:(resp:any) => {
              this.totalProducts = resp.totalProducts;
              this.products = resp.products;
            }
          });
  };

  deleteProduct(productId:string){
    this.productSvc.deleteProduct(productId)
          .subscribe({
            error:(err:any) => {
              Swal.fire('Oooops', err.error.message, 'error')
            },
            next:(resp:any) => {
              this.getProducts();
              Swal.fire('Éxito', resp.message, 'success');
            }
          });
  };

  goToEdit(p:any){
      sessionStorage.setItem('product', JSON.stringify(p));
      this.router.navigateByUrl('/home/products/update')
  };

  addProductToKart(pr:string, price:number, quantity:number ){
    this.selectedId = pr;
    this.quantity  = quantity;
      const product = {
        product:pr ,
        quantity: this.quantity,
        price: price
      };

      const existentInd = this.productSelected.findIndex(p => p.product === product.product);
      if (existentInd !== -1) {
        // Producto ya existe, actualizamos la cantidad
        this.productSelected[existentInd].quantity = product.quantity;
      } else {
        // Producto no existe, lo agregamos al arreglo
        this.productSelected.push(product);
        this.quantity = 0;
    }
  };

  goToOrder(){
    const ps = JSON.stringify(this.productSelected)
    sessionStorage.setItem('productsSelected', ps );
    this.router.navigateByUrl('/home/orders/create');
  }
}
