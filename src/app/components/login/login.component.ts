import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

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
        // redirect ili obrada tokena
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
