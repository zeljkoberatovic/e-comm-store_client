import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Location } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-category-form',
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],

  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
  constructor(private location: Location) {}  // Injektovanje Location servis
  categoryService = inject(CategoryService);
  router = inject(Router);
  name!: string;

  // Funkcija koja se poziva kada se klikne na dugme "Back"
  goBack() {
    this.location.back(); // Vraća korisnika na prethodnu stranicu
  }
  add() {
    //console.log(this.name);
    this.categoryService.addCategory(this.name).subscribe((result: any) => {
      alert("Category added successfully!");
      this.router.navigateByUrl("/admin/categories");
    })
  }

}
