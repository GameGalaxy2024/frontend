import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit{
  public product:any;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.product = JSON.parse(sessionStorage.getItem('product') || '');
    console.log(this.product)
  }
  constructor(private productSvc:ProductsService, private router:Router){}
  catchData(event:any){
    console.log(event)
    this.productSvc.updateProduct(event, event._id)
          .subscribe({
            error:(err:any) => {
              Swal.fire('Ooops', err.error.message, 'error');
            },
            next:(resp:any) => {
              this.router.navigateByUrl('/home/products')
              Swal.fire('Éxito', 'Producto editado', 'success');
              sessionStorage.removeItem('product')

            }
          });
  };


}
