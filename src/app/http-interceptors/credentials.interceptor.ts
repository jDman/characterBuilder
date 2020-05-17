import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authToken = this.authService.getAuthSessionItem(
      sessionStorage,
      'token'
    );

    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + authToken,
        },
      });
    }

    if (request.method !== 'OPTIONS') {
      const cookies = document.cookie.split(';');

      for (const cookie of cookies) {
        const [key, value] = cookie.split('=');

        if (!!key && !!value) {
          if (key.trim() === 'XSRF_TOKEN') {
            request = request.clone({
              setHeaders: {
                'x-xsrf-token': value,
              },
            });
          }
        }
      }
    }

    return next.handle(request);
  }
}
