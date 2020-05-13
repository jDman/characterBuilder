import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs/operators';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService;

  let authServiceStub: Partial<AuthService>;

  authServiceStub = {
    isAuth$: of(false),
  };

  let router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceStub }],
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should subscribe to the auth service auth$ and call checkIsAuth with value', () => {
      spyOn(guard, 'checkIsAuth');

      (guard.canActivate(authService, router) as Observable<boolean>)
        .pipe(take(1))
        .subscribe();

      expect(guard.checkIsAuth).toHaveBeenCalledWith(false);
    });
  });

  describe('checkIsAuth', () => {
    it('should return true if passed in parameter is also true', () => {
      const isAuth = guard.checkIsAuth(true);

      expect(isAuth).toBe(true);
    });

    it('should navigate to login page and return false if passed in parameter is false', () => {
      spyOn(router, 'navigate');
      const isAuth = guard.checkIsAuth(false);

      expect(isAuth).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
    });
  });
});
