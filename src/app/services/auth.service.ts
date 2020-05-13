import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, distinctUntilChanged } from 'rxjs/operators';

import { SignupFormValue } from '../auth/interfaces/signup-form-value.interface';
import { LoginFormValue } from '../auth/interfaces/login-form-value.interface';
import { isNonNull } from '../utils/isNonNull';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthSource = new BehaviorSubject<boolean>(false);
  isAuth$: Observable<boolean> = this.isAuthSource
    .asObservable()
    .pipe(filter(isNonNull), distinctUntilChanged());

  constructor(private http: HttpClient) {}

  getAuthSessionItem(storage: Storage, key: string): string {
    return storage.getItem(key);
  }

  setAuthSessionItems(
    storage: Storage,
    token: string,
    expiryDate: Date,
    userId: string
  ): void {
    storage.setItem('expiryDate', expiryDate.toISOString());
    storage.setItem('token', token);
    storage.setItem('userId', userId);
  }

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

  updateIsAuth(isAuth: boolean): void {
    this.isAuthSource.next(isAuth);
  }
}
