import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponses } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string;
  apiKey: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.apiKey = environment.apiKey;
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponses>(`${this.apiUrl}?key=${this.apiKey}`, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }
}
