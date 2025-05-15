import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Product } from '../types/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http = inject(HttpClient);

  constructor() { }

  getNewProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.apiUrl + '/customer/new-products');
  }

   getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.apiUrl + '/customer/featured-products');
  }
}
