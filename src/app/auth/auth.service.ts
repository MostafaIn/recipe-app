import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponses } from './auth.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
    return this.http
      .post<AuthResponses>(`${this.apiUrl}?key=${this.apiKey}`, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((errorRes) => {
          let errMsg = 'An unknown erorr is accurred!!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errMsg);
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errMsg = 'This email exists already!';
          }
          return throwError(errMsg);
        })
      );
  }
}
