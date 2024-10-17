import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <mat-card>
      <mat-card-title>Login</mat-card-title>
      <mat-card-content>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <mat-form-field class="full-width">
            <input matInput placeholder="User ID" formControlName="userId">
            <mat-error *ngIf="loginForm.get('userId')?.hasError('required')">User ID is required</mat-error>
          </mat-form-field>
          <mat-form-field class="full-width">
            <input matInput type="password" placeholder="Password" formControlName="password">
            <mat-error *ngIf="loginForm.get('password')?.hasError('required')">Password is required</mat-error>
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid">Login</button>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card {
      max-width: 400px;
      margin: 2em auto;
      text-align: center;
    }
    mat-form-field {
      display: block;
      margin-bottom: 1em;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        () => {
          // Navigate based on user role
          const role = this.authService.getUserRole();
          switch (role) {
            case 'SuperUser':
              this.router.navigate(['/super-user']);
              break;
            case 'Admin':
              this.router.navigate(['/admin']);
              break;
            case 'AppSupport':
              this.router.navigate(['/app-support']);
              break;
            default:
              this.router.navigate(['/login']);
          }
        },
        error => {
          console.error('Login failed', error);
          // Handle login error (show message to user)
        }
      );
    }
  }
}