import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AppService } from '../../shared/services/app.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../shared/services/auth.service';
import { FormField } from '../../shared/components/form-field/form-field';
import { ThemeLangToggle } from '../../shared/components/theme-lang-toggle/theme-lang-toggle';

export interface Country {
  name: string;
  code: string;
}

function firstError(errors: ValidationErrors | null | undefined): string | null {
  if (!errors) return null;
  if (errors['required']) return 'This field is required.';
  if (errors['email']) return 'Please enter a valid email address.';
  if (errors['minlength']) return `At least ${errors['minlength'].requiredLength} characters.`;
  if (errors['passwordMismatch']) return 'Passwords do not match.';
  return 'Invalid value.';
}

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const repeatPassword = control.get('repeatPassword');
  if (password && repeatPassword && password.value !== repeatPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    InputTextModule,
    PasswordModule,
    SelectModule,
    ButtonModule,
    CardModule,
    FormField,
    ThemeLangToggle,
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  signupForm!: FormGroup;
  submitted = false;
  loading = false;
  wasError = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public appService: AppService,
    private authService: AuthService,
    private messageService: MessageService,
  ) {
    this.signupForm = this.fb.nonNullable.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        country: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeatPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator },
    );
  }

  countries: Country[] = [
    { name: 'Egypt', code: 'EG' },
    { name: 'Jordan', code: 'JO' },
    { name: 'Lebanon', code: 'LB' },
    { name: 'Syria', code: 'SY' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'United Arab Emirates', code: 'AE' },
    { name: 'Qatar', code: 'QA' },
    { name: 'Kuwait', code: 'KW' },
    { name: 'Oman', code: 'OM' },
    { name: 'Bahrain', code: 'BH' },
    { name: 'Iraq', code: 'IQ' },
    { name: 'Palestine', code: 'PS' },
    { name: 'Yemen', code: 'YE' },
    { name: 'Turkey', code: 'TR' },
    { name: 'Iran', code: 'IR' },
    { name: 'India', code: 'IN' },
    { name: 'Pakistan', code: 'PK' },
    { name: 'United States', code: 'US' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'Canada', code: 'CA' },
    { name: 'Australia', code: 'AU' },
    { name: 'Germany', code: 'DE' },
    { name: 'France', code: 'FR' },
    { name: 'Other', code: 'XX' },
  ];

  errorFor(controlName: string): string | null {
    const control = this.signupForm.get(controlName);
    if (!this.submitted || !control || !control.errors) return null;
    return firstError(control.errors);
  }

  get formError(): string | null {
    if (!this.submitted) return null;
    if (this.signupForm.errors?.['passwordMismatch']) return 'Passwords do not match.';
    return null;
  }

  onSubmit(): void {
    if (this.wasError) return;
    this.submitted = true;
    if (this.signupForm.invalid) return;

    this.loading = true;
    const { repeatPassword, ...payload } = this.signupForm.value;
    this.authService.register(payload).subscribe({
      next: () => {
        this.authService.setPendingApproval(true);
        this.router.navigate(['/pending-approval']);
      },
      error: (err) => {
        this.loading = false;
        this.wasError = true;
        this.messageService.clear();
        this.messageService.add({
          severity: 'error',
          summary: 'Registration Failed',
          detail: err.error?.message || 'Please try again.',
          life: 4000,
        });
      },
    });
  }
}
