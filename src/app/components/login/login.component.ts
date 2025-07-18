import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  public router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  
onSubmit() {
  if (this.loginForm.valid) {
    const email = (this.loginForm.value.email ?? '').trim();
    const password = (this.loginForm.value.password ?? '').trim();

    this.authService.login({ email, password }).subscribe({
      next: res => {
        console.log('Prijava uspešna:', res);

        
        this.authService.setLoggedInUser(res.user); 
        if (res.user.isAdmin) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: err => {
        console.error('Greška pri prijavi:', err);
      }
    });
        
  } else {
    this.loginForm.markAllAsTouched();
  }
}


}
