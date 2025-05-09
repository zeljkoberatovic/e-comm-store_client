import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Brand } from '../types/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/brand';

  constructor() {}

  //  Vraća listu brendova
  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl);
  }

  //  Vraća jedan brend po ID-u
  getBrandById(id: string): Observable<Brand> {
    return this.http.get<Brand>(`${this.apiUrl}/${id}`);
  }

  //  Dodaje brend, vraća kreirani objekat
  addBrand(name: string): Observable<Brand> {
    return this.http.post<Brand>(this.apiUrl, { name });
  }

  //  Ažurira brend
  updateBrand(id: string, name: string): Observable<Brand> {
    return this.http.put<Brand>(`${this.apiUrl}/${id}`, { name });
  }

  //  Briše brend po ID-u
  deleteBrandById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
