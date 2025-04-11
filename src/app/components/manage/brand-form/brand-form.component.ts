import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../../services/brand.service';




@Component({
  selector: 'app-brand-form',
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss'
})
export class BrandFormComponent implements OnInit{

  brandService = inject(BrandService);
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
      this.brandService.getBrandById(id).subscribe((result: any) => {
        //console.log(result);
        this.name = result.name;
      });
    }
  }

  goBack() {
    this.location.back();
  }

  add() {
    this.brandService.addBrand(this.name).subscribe(() => {
      alert("Brand added successfully!");
      this.router.navigateByUrl("/admin/brands");
    });
  }

  update() {
    if (this.id && this.name) {
      this.brandService.updateBrand(this.id, this.name).subscribe(() => {
        alert("Brand updated successfully!"); 
        this.router.navigateByUrl("/admin/brands");
      });
    } else {
      console.error('ID or name is missing. Cannot update.');
    }
  }

  

}
