import { CommonModule, AsyncPipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../../../types/category';
import { SearchService } from '../../../services/search.service';
import { AuthService } from '../../../services/auth.service';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MatIconModule, CommonModule, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() categories!: Observable<Category[]>;
  menuOpen = false;

  private searchService = inject(SearchService);
  private authService = inject(AuthService);
  private router = inject(Router);

  user$ = this.authService.loggedInUser$;

  toggleNav() {
    this.menuOpen = !this.menuOpen;
  }

  onSearch(event: Event) {
    const input = (event.target as HTMLInputElement).value.trim();
    this.searchService.setSearchTerm(input);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
