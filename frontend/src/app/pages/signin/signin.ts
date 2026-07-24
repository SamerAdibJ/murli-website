import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AppService } from '../../shared/services/app.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../shared/services/auth.service';
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
  loading = false;
  wasError = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public appService: AppService,
    private authService: AuthService,
    private messageService: MessageService,
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
    if (this.wasError) return;
    this.submitted = true;
    if (this.signinForm.invalid) return;

    this.loading = true;
    this.authService.login(this.signinForm.value).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.loading = false;
        this.wasError = true;
        const msg: string = err.error?.message || '';
        if (msg.toLowerCase().includes('pending')) {
          this.authService.setPendingApproval(true);
          this.router.navigate(['/pending-approval']);
        } else {
          this.messageService.clear();
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: msg || 'Invalid email or password.',
            life: 4000,
          });
        }
      },
    });
  }
}
