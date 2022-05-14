import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
      .post<AuthResponses>(`${this.apiUrl}accounts:signUp?key=${this.apiKey}`, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponses>(
        `${this.apiUrl}accounts:signInWithPassword?key=${this.apiKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errMsg = 'An unknown erorr is accurred!!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errMsg);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errMsg = 'This email exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
        errMsg = 'This email does not exist!';
        break;
      case 'INVALID_PASSWORD':
        errMsg = 'This password is not correct!';
        break;
    }
    return throwError(errMsg);
  }
}
