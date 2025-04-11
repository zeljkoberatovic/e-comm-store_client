import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http = inject(HttpClient);

  constructor() { }

  // Definiši osnovni API URL
  private apiUrl = environment.apiUrl + '/category';

  getCategories(){
    return this.http.get(this.apiUrl);
  }

  getCategoryById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addCategory(name: string) {
    return this.http.post(this.apiUrl, { name: name });
  }

  updateCategory(id: string, name: string) {
    return this.http.put(`${this.apiUrl}/${id}`, { name: name });
  }

  deleteCategoryById(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
