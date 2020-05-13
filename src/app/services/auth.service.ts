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
  private expiryDateKey = 'expiryDate';
  private tokenKey = 'token';
  private userIdKey = 'userId';

  isAuth$: Observable<boolean> = this.isAuthSource
    .asObservable()
    .pipe(filter(isNonNull), distinctUntilChanged());

  constructor(private http: HttpClient) {}

  clearAuthSessionItem(storage: Storage, key: string): void {
    storage.removeItem(key);
  }

  getAuthSessionItem(storage: Storage, key: string): string {
    return storage.getItem(key);
  }

  setAuthSessionItems(
    storage: Storage,
    token: string,
    expiryDate: Date,
    userId: string
  ): void {
    storage.setItem(this.expiryDateKey, expiryDate.toISOString());
    storage.setItem(this.tokenKey, token);
    storage.setItem(this.userIdKey, userId);
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

  logout(storage: Storage): void {
    this.clearAuthSessionItem(storage, this.expiryDateKey);
    this.clearAuthSessionItem(storage, this.tokenKey);
    this.clearAuthSessionItem(storage, this.userIdKey);

    this.updateIsAuth(false);
  }

  updateIsAuth(isAuth: boolean): void {
    this.isAuthSource.next(isAuth);
  }
}
