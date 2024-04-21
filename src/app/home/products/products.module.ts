import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { SharedModule } from '../../shared/shared.module';
import { OrdersModule } from '../orders/orders.module';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    OrdersModule
  ]
})
export class ProductsModule { }
