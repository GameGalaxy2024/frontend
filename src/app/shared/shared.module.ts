import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsFormComponent } from './products-form/products-form.component';
import { OrdersFormComponent } from './orders-form/orders-form.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductSummaryComponent } from './product-summary/product-summary.component';



@NgModule({
  declarations: [
    ProductsFormComponent,
    OrdersFormComponent,
    HeaderComponent,
    FooterComponent,
    ProductSummaryComponent
  ],
  exports: [
    ProductsFormComponent,
    OrdersFormComponent,
    HeaderComponent,
    FooterComponent,
    ProductSummaryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class SharedModule { }
