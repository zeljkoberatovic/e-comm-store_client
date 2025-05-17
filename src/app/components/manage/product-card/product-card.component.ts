import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ CommonModule, MatCardModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input() product: any;
  @Output() add = new EventEmitter<any>();

  getDiscountedPrice(product: any): number {
    return product.price - (product.price * product.discount / 100);
  }

  addToCart(product: any) {
    this.add.emit(product);
  }

}
