import { Component } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {


  constructor(private productSvc:ProductsService, private router:Router){}
  catchData(event:string){
    console.log(event)
    this.productSvc.createProduct(event)
          .subscribe({
            error:(err:any) => {
              Swal.fire('Ooops', err.error.message, 'error');
            },
            next:(resp:any) => {
              this.router.navigateByUrl('/home/products')
              Swal.fire('Éxito', 'Producto registrado', 'success');

            }
          });
  };


}
