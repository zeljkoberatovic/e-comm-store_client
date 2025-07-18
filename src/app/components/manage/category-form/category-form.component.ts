import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, Location } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private location = inject(Location);
  private route = inject(ActivatedRoute);

  form!: FormGroup;
  isEdit = false;
  id!: string;

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });

    const { id } = this.route.snapshot.params;
    if (id) {
      this.isEdit = true;
      this.id = id;
      this.categoryService.getCategoryById(id).subscribe((result: any) => {
        this.form.patchValue({ name: result.name });
      });
    }
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    if (this.form.invalid) return;

    const name = this.form.value.name;
    if (this.isEdit && this.id) {
      this.categoryService.updateCategory(this.id, name).subscribe(() => {
        alert("Category updated successfully!");
        this.router.navigateByUrl("/admin/dashboard/categories");
      });
    } else {
      this.categoryService.addCategory(name).subscribe(() => {
        alert("Category added successfully!");
        this.router.navigateByUrl("/admin/dashboard/categories");
      });
    }
  }
}
