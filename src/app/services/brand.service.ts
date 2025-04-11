import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
  http = inject(HttpClient);

  constructor() { }

  private apiUrl = environment.apiUrl + '/brand'; // Korišćenje API URL-a iz environment fajla

  getBrands() {
    return this.http.get(this.apiUrl);
  }
  
  getBrandById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  
  addBrand(name: string) {
    return this.http.post(this.apiUrl, { name: name });
  }
  
  updateBrand(id: string, name: string) {
    return this.http.put(`${this.apiUrl}/${id}`, { name: name });
  }
  
  deleteBrandById(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
