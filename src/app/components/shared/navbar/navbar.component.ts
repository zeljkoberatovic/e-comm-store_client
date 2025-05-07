import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MatIconModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
[x: string]: any;

  
  menuOpen = false;

  toggleNav() {
    this.menuOpen = !this.menuOpen;
  }
}
