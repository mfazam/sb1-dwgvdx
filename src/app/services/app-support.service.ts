import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSupportService {
  private apiUrl = 'https://host.com/v1/app-support';

  constructor(private http: HttpClient) {}

  getLogs(date: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/logs?date=${date}`, { responseType: 'text' });
  }
}