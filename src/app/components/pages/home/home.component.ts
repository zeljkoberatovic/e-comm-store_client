import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { Product } from '../../../types/product';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../manage/product-card/product-card.component';
import { SearchService } from '../../../services/search.service';
import { ImageSliderComponent } from '../../shared/image-slider/image-slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    ProductCardComponent,
    ImageSliderComponent
  ],
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

  displayedFeatured: Product[] = [];
  displayedNew: Product[] = [];

  featuredVisibleCount = 5;
  newVisibleCount = 5;

  isSearchActive = false;

  ngOnInit() {
    this.customerService.getFeaturedProducts().subscribe((result) => {
      this.featuredProduct = result;
      this.allProducts = result;
      this.filteredProducts = result;
      this.displayedFeatured = this.featuredProduct.slice(0, this.featuredVisibleCount);
    });

    this.customerService.getNewProducts().subscribe((result) => {
      this.newProduct = result;
      this.displayedNew = this.newProduct.slice(0, this.newVisibleCount);
    });

    this.searchService.searchTerm$.subscribe((term) => {
      if (term && term.trim().length > 0) {
        this.isSearchActive = true;
        const lowerTerm = term.toLowerCase();
        this.filteredProducts = this.allProducts.filter(product =>
          product.name.toLowerCase().includes(lowerTerm)
        );
      } else {
        this.isSearchActive = false;
      }
    });
  }

  getDiscountedPrice(product: Product): number {
    if (!product.discount) return product.price;
    return product.price - (product.price * product.discount / 100);
  }

  addToCart(product: Product) {
    console.log('Dodato u korpu:', product.name);
    // Ovdje dodaj logiku za dodavanje u korpu
  }

  loadMoreFeatured() {
    this.featuredVisibleCount += 5;
    this.displayedFeatured = this.featuredProduct.slice(0, this.featuredVisibleCount);
  }

  loadMoreNew() {
    this.newVisibleCount += 5;
    this.displayedNew = this.newProduct.slice(0, this.newVisibleCount);
  }
}
