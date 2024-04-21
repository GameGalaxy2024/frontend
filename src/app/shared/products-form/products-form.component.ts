import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {

  @Output() data = new EventEmitter<any>();
  @Input() product:any;
  public name:string = '';
  public description:string = '';
  public price:any = '';
  public stock:any = '';
  public id:string = '';
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.name = this.product?.name
    this.description = this.product?.description
    this.price = this.product?.price
    this.id = this.product?._id
    this.stock = this.product?.stock
  }

  sendData(){
    this.data.emit( {
      name: this.name,
      description: this.description,
      price: this.price,
      stock: this.stock,
      _id: this.id
    });
  };

  onlyNumbers(valor: string, input:number) {
    // Acepta solo números y reemplaza cualquier otro carácter no numérico
    if (input == 1) {
      this.price = this.price.toString();
      if (valor.length) {
        this.price = valor.replace(/[^0-9]/g, '');
        this.price = Number(this.price);
      }
    } else {

      this.stock = this.stock.toString();
      if (valor.length) {
      this.stock = valor?.replace(/[^0-9]/g, '');
      this.stock = Number(this.stock);
      }
    };
  };
}
