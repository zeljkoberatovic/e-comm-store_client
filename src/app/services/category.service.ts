import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Category } from '../types/category';  

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http = inject(HttpClient);

  private apiUrl = environment.apiUrl + '/category';

  constructor() {}

  //  Vrati Observable liste kategorija
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  // Vrati Observable jedne kategorije
  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  //  Dodavanje kategorije — vraća kreirani objekat kategorije
  addCategory(name: string): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, { name });
  }

  //  Ažuriranje — vraća ažurirani objekat
  updateCategory(id: string, name: string): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, { name });
  }

  //  Brisanje — vraća prazan odgovor
  deleteCategoryById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
