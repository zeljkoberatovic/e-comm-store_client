import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/product`;

  constructor() {}

  // Get all products
  getProducts() {
    return this.http.get(`${this.apiUrl}`);
  }

  // Get one product by ID
  getProductById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Create product
  addProduct(data: any) {
    return this.http.post(`${this.apiUrl}`, data);
  }

  // Update product
  updateProduct(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // Delete product
  deleteProductById(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
