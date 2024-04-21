import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public isAdmin:boolean = false;
  public orders:any[] = [];
  public showActionsMenu:boolean = false;
  public orderSelected:string = '';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.isAdmin = sessionStorage.getItem('isAdmin') == 'true' ? true : false || false;
    if (this.isAdmin) {
      this.getAdminOrders();
    } else {
      this.getUserOrders();
    }
  }

  constructor(private orderSvc:OrderService){}

  getUserOrders(){
    this.orderSvc.getOrders(sessionStorage.getItem('userId') || '')
        .subscribe({
          error:(err:any) => {
            console.log(err);
            this.orders = [];
          },
          next:(resp:any) => {
            this.orders = resp;
          }
        });
  };

  getAdminOrders(){
    this.orderSvc.getAdminOrders()
        .subscribe({
          error:(err:any) => {
            console.log(err);
          },
          next:(resp:any) => {
            this.orders = resp.orders;
            console.log(this.orders);
          }
        });
  };

  updateOrder(p:any, status:number){
      const data =  {
        customerName: p?.customerName,
        customerEmail: p?.customerName,
        shippingAddress: p?.orderDate,
        products: p.products,
        orderStatus: status // Nuevo estado de la orden (por ejemplo, 2 para "despachado")
      };
      this.orderSvc.updateOrder(data, p._id)
            .subscribe({
              error:(err:any) => {
                console.log(err);
                console.log(data)
                Swal.fire('Oooops', err.error.message, 'error');
              },
              next:(resp:any) => {
                console.log(resp);
                this.showActionsMenu = false;
                this.orderSelected = '';
                Swal.fire('Éxito', 'Orden actualizada', 'success');
                if (this.isAdmin) {
                  this.getAdminOrders();
                } else {
                  this.getUserOrders();
                }
              }
            })

  };

  showDropdown(id:string){
    this.orderSelected = id;
    this.showActionsMenu = !this.showActionsMenu;
  };

  deleteOrder(id:string){
    this.orderSvc.deleteOrder(id)
        .subscribe({
          error:(err:any) => {
            console.log(err);
            Swal.fire('Ooops', err.error.message, 'error');
          },
          next:(resp:any) => {
            console.log(resp);
            Swal.fire('Éxito', 'Orden eliminada', 'success');
            this.showActionsMenu = false;
            this.orderSelected = '';
            if (this.isAdmin) {
              this.getAdminOrders();
            } else {
              this.getUserOrders();
            }
          }
        })
  }
}
