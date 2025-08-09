import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { BrandService } from '../services/brand.service';

@Injectable({
  providedIn: 'root'
})
export class CommonResolver implements Resolve<any> {
  private serviceMap: Record<string, any>;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private brandService: BrandService
  ) {
    this.serviceMap = {
      category: {
        list: () => this.categoryService.getCategories(),
        single: (id: string) => this.categoryService.getCategoryById(id)
      },
      product: {
        list: () => this.productService.getProducts(),
        single: (id: string) => this.productService.getProductById(id)
      },
      brand: {
        list: () => this.brandService.getBrands(),
        single: (id: string) => this.brandService.getBrandById(id)
      }
    };
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const type = route.data['type'];
    const id = route.paramMap.get('id');

    const service = this.serviceMap[type];
    if (!service) {
      throw new Error(`Unknown type in resolver: ${type}`);
    }

    return id ? service.single(id) : service.list();
  }
}
