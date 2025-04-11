import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  http = inject(HttpClient);

  constructor() { }

  getBrands() {
    return this.http.get("http://localhost:3000/brand");
  }
  
  getBrandById(id: string) {
    return this.http.get("http://localhost:3000/brand/" + id);
  }
  
  addBrand(name: string) {
    return this.http.post("http://localhost:3000/brand", { name: name });
  }
  
  updateBrand(id: string, name: string) {
    return this.http.put("http://localhost:3000/brand/" + id, { name: name });
  }
  
  deleteBrandById(id: string) {
    return this.http.delete("http://localhost:3000/brand/" + id);
  }
  
}
