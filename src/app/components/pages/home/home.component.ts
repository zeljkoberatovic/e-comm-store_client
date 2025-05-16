import { ChangeDetectorRef } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { Product } from '../../../types/product';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  customerService = inject(CustomerService);
  cd = inject(ChangeDetectorRef);

  newProduct: Product[] = [];
  featuredProduct: Product[] = [];

  ngOnInit() {
    this.customerService.getFeaturedProducts().subscribe((result) => {
      this.featuredProduct = result;
      console.log(this.featuredProduct);
    });
    this.customerService.getNewProducts().subscribe((result) => {
      this.newProduct = result;
      console.log(this.newProduct);
    });
  }
  getDiscountedPrice(product: Product): number {
  if (!product.discount) return product.price;
  return product.price - (product.price * product.discount / 100);
}

addToCart(product: Product) {
  console.log('Dodato u korpu:', product.name);
  //ovdje dodajemo logiku za dodavanje u korpi proizvod
}



}
