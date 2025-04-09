import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Location } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnInit {
  categoryService = inject(CategoryService);
  router = inject(Router);
  location = inject(Location);
  private route = inject(ActivatedRoute);

  name!: string;
  isEdit = false;
  id!: string;

  ngOnInit() {
    const { id } = this.route.snapshot.params;

    if (id) {
      this.isEdit = true;
      this.id = id; 
      this.categoryService.getCategoryById(id).subscribe((result: any) => {
        //console.log(result);
        this.name = result.name;
      });
    }
  }

  goBack() {
    this.location.back();
  }

  add() {
    this.categoryService.addCategory(this.name).subscribe(() => {
      alert("Category added successfully!");
      this.router.navigateByUrl("/admin/categories");
    });
  }

  update() {
    if (this.id && this.name) {
      this.categoryService.updateCategory(this.id, this.name).subscribe(() => {
        alert("Category updated successfully!"); 
        this.router.navigateByUrl("/admin/categories");
      });
    } else {
      console.error('ID or name is missing. Cannot update.');
    }
  }

  
  
}
