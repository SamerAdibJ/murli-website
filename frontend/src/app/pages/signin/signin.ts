import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AppService } from '../../shared/services/app.service';
import { FormField } from '../../shared/components/form-field/form-field';
import { ThemeLangToggle } from '../../shared/components/theme-lang-toggle/theme-lang-toggle';

@Component({
  selector: 'app-signin',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    ThemeLangToggle,
    FormField,
  ],
  templateUrl: './signin.html',
  styleUrl: './signin.scss',
})
export class Signin {
  signinForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    public appService: AppService,
  ) {
    this.signinForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  errorFor(controlName: string): string | null {
    const control = this.signinForm.get(controlName);
    if (!this.submitted || !control || !control.errors) return null;
    const e = control.errors;
    if (e['required']) return 'This field is required.';
    if (e['email']) return 'Please enter a valid email address.';
    if (e['minlength']) return `At least ${e['minlength'].requiredLength} characters.`;
    return 'Invalid value.';
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.signinForm.valid) {
      console.log('Signin payload:', this.signinForm.value);
    }
  }
}
