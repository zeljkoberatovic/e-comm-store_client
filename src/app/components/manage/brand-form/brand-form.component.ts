import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../../services/brand.service';

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private brandService = inject(BrandService);
  private router = inject(Router);
  private location = inject(Location);
  private route = inject(ActivatedRoute);

  form!: FormGroup;
  isEdit = false;
  id!: string;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });

    const { id } = this.route.snapshot.params;
    if (id) {
      this.isEdit = true;
      this.id = id;
      this.brandService.getBrandById(id).subscribe((result: any) => {
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
      this.brandService.updateBrand(this.id, name).subscribe(() => {
        alert("Brand updated successfully!");
        this.router.navigateByUrl("/admin/brands");
      });
    } else {
      this.brandService.addBrand(name).subscribe(() => {
        alert("Brand added successfully!");
        this.router.navigateByUrl("/admin/brands");
      });
    }
  }
}
