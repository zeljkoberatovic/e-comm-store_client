import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgIf } from '@angular/common';

import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'webapp';

  private router = inject(Router);

  
  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin'); 
  }
}
