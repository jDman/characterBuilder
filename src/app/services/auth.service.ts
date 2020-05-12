import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SignupFormValue } from '../auth/interfaces/signup-form-value.interface';
import { LoginFormValue } from '../auth/interfaces/login-form-value.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(body: SignupFormValue): Observable<any> {
    return this.http
      .post<any>('http://localhost:5050/api/signup', { ...body })
      .pipe(
        catchError((err) => {
          return throwError(err.message);
        })
      );
  }

  login(body: LoginFormValue): Observable<any> {
    return this.http
      .post<any>('http://localhost:5050/api/login', { ...body })
      .pipe(
        catchError((err) => {
          return throwError(err.message);
        })
      );
  }
}
