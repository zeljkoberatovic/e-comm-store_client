import { ChangeDetectorRef } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { Product } from '../../../types/product';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../manage/product-card/product-card.component';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, CommonModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  customerService = inject(CustomerService);
  searchService = inject(SearchService);
  cd = inject(ChangeDetectorRef);

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];

  newProduct: Product[] = [];
  featuredProduct: Product[] = [];

  isSearchActive = false;

  ngOnInit() {
    this.customerService.getFeaturedProducts().subscribe((result) => {
      this.featuredProduct = result;
      this.allProducts = result;
      this.filteredProducts = result;
    });

    this.customerService.getNewProducts().subscribe((result) => {
      this.newProduct = result;
    });

    this.searchService.searchTerm$.subscribe((term) => {
      if (this.allProducts) {
        this.filteredProducts = this.allProducts.filter(product =>
          product.name.toLowerCase().startsWith(term)
        );
      }
    });
  }

  getDiscountedPrice(product: Product): number {
    if (!product.discount) return product.price;
    return product.price - (product.price * product.discount / 100);
  }

  addToCart(product: Product) {
    console.log('Dodato u korpu:', product.name);
    // ovdje dodajemo logiku za dodavanje u korpu
  }
}
