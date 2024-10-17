import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuperUserService } from '../../services/super-user.service';

@Component({
  selector: 'app-super-user',
  template: `
    <h2>Super User Dashboard</h2>
    <mat-card>
      <mat-card-title>System Configuration</mat-card-title>
      <mat-card-content>
        <form [formGroup]="configForm" (ngSubmit)="onSubmit()">
          <mat-form-field class="full-width">
            <input matInput placeholder="Config Key" formControlName="configKey">
          </mat-form-field>
          <mat-form-field class="full-width">
            <input matInput placeholder="Config Value" formControlName="configValue">
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit">Save Configuration</button>
        </form>
      </mat-card-content>
    </mat-card>
    <mat-card *ngIf="configurations">
      <mat-card-title>Current Configurations</mat-card-title>
      <mat-card-content>
        <pre>{{ configurations | json }}</pre>
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
export class SuperUserComponent implements OnInit {
  configForm: FormGroup;
  configurations: any;

  constructor(
    private fb: FormBuilder,
    private superUserService: SuperUserService
  ) {
    this.configForm = this.fb.group({
      configKey: ['', Validators.required],
      configValue: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadConfigurations();
  }

  loadConfigurations() {
    this.superUserService.getConfigurations().subscribe(
      data => this.configurations = data,
      error => console.error('Error loading configurations', error)
    );
  }

  onSubmit() {
    if (this.configForm.valid) {
      this.superUserService.saveConfiguration(this.configForm.value).subscribe(
        () => {
          console.log('Configuration saved');
          this.loadConfigurations();
          this.configForm.reset();
        },
        error => console.error('Error saving configuration', error)
      );
    }
  }
}