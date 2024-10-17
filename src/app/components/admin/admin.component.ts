import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  template: `
    <h2>Admin Dashboard</h2>
    <mat-card>
      <mat-card-title>User Management</mat-card-title>
      <mat-card-content>
        <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
          <mat-form-field class="full-width">
            <input matInput placeholder="Username" formControlName="username">
          </mat-form-field>
          <mat-form-field class="full-width">
            <input matInput placeholder="Email" formControlName="email">
          </mat-form-field>
          <mat-form-field class="full-width">
            <mat-select placeholder="Role" formControlName="role">
              <mat-option value="SuperUser">Super User</mat-option>
              <mat-option value="Admin">Admin</mat-option>
              <mat-option value="AppSupport">App Support</mat-option>
            </mat-select>
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit">Create User</button>
        </form>
      </mat-card-content>
    </mat-card>
    <mat-card *ngIf="users">
      <mat-card-title>User List</mat-card-title>
      <mat-card-content>
        <mat-list>
          <mat-list-item *ngFor="let user of users">
            {{ user.username }} - {{ user.email }} - {{ user.role }}
          </mat-list-item>
        </mat-list>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card {
      margin-bottom: 20px;
    }
    .full-width {
      width: 100%;
    }
  `]
})
export class AdminComponent implements OnInit {
  userForm: FormGroup;
  users: any[];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
    this.users = [];
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe(
      data => this.users = data,
      error => console.error('Error loading users', error)
    );
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.adminService.createUser(this.userForm.value).subscribe(
        () => {
          console.log('User created');
          this.loadUsers();
          this.userForm.reset();
        },
        error => console.error('Error creating user', error)
      );
    }
  }
}