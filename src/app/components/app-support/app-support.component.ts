import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppSupportService } from '../../services/app-support.service';

@Component({
  selector: 'app-app-support',
  template: `
    <h2>App Support Dashboard</h2>
    <mat-card>
      <mat-card-title>Log Viewer</mat-card-title>
      <mat-card-content>
        <form [formGroup]="logForm" (ngSubmit)="onSubmit()">
          <mat-form-field class="full-width">
            <input matInput [matDatepicker]="picker" placeholder="Select Date" formControlName="date">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit">View Logs</button>
        </form>
      </mat-card-content>
    </mat-card>
    <mat-card *ngIf="logs">
      <mat-card-title>Application Logs</mat-card-title>
      <mat-card-content>
        <pre>{{ logs }}</pre>
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
    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  `]
})
export class AppSupportComponent implements OnInit {
  logForm: FormGroup;
  logs: string;

  constructor(
    private fb: FormBuilder,
    private appSupportService: AppSupportService
  ) {
    this.logForm = this.fb.group({
      date: ['', Validators.required]
    });
    this.logs = '';
  }

  ngOnInit() {}

  onSubmit() {
    if (this.logForm.valid) {
      const date = this.logForm.get('date')?.value;
      this.appSupportService.getLogs(date).subscribe(
        data => this.logs = data,
        error => console.error('Error fetching logs', error)
      );
    }
  }
}