import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  registerForm = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    },
    { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;

      // Pravimo payload sa svim potrebnim poljima za RegisterPayload
      const payload = {
        firstName: formValue.firstName!.trim(),
        lastName: formValue.lastName!.trim(),
        name: `${formValue.firstName!.trim()} ${formValue.lastName!.trim()}`,
        email: formValue.email!,
        password: formValue.password!
      };

      this.authService.register(payload).subscribe({
        next: res => {
          console.log(' Registracija uspešna:', res);
          
        },
        error: err => {
          console.error(' Greška pri registraciji:', err);
          
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
