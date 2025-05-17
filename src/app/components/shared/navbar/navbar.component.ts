import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../../../types/category';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MatIconModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Input() categories!: Observable<Category[]>;
  menuOpen = false;

  private searchService = inject(SearchService);

  toggleNav() {
    this.menuOpen = !this.menuOpen;
  }

 
  onSearch(event: Event) {
    const input = (event.target as HTMLInputElement).value.trim();
    this.searchService.setSearchTerm(input);
  }
}
