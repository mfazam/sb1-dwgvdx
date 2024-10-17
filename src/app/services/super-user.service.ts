import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperUserService {
  private apiUrl = 'https://host.com/v1/super-user';

  constructor(private http: HttpClient) {}

  getConfigurations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/configurations`);
  }

  saveConfiguration(config: { configKey: string; configValue: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/configurations`, config);
  }
}