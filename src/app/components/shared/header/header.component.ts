import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../types/category';

@Component({
  selector: 'app-header',
  imports: [NavbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  categoryService = inject(CategoryService);
  categoryList$ = this.categoryService.getCategories();
}

