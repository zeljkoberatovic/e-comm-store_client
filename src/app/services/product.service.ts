import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient);

  constructor() {}

  private apiUrl = `${environment.apiUrl}/product`;

  

  
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);    
  }

 
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);  
  }

 
  addProduct(data: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, data);  
  }

  
  updateProduct(id: string, data: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, data);  
  }

 
  deleteProductById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);  
  }
}

