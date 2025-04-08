import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Location } from '@angular/common';



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

  // Funkcija koja se poziva kada se klikne na dugme "Back"
  goBack() {
    this.location.back(); // Vraća korisnika na prethodnu stranicu
  }

}
