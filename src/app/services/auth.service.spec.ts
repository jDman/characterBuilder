import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

describe('AuthService', () => {
  let service: AuthService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const sessionStorage = {
    getItem: jasmine.createSpy(),
    setItem: jasmine.createSpy(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signup', () => {
    it('should post and return data', () => {
      const expectedFormValues = {
        name: 'Tester',
        email: 'test@test.com',
        password: '12345678',
      };
      service.signup(expectedFormValues).subscribe((res) => {
        expect(res).toEqual({ message: 'success' });
      });

      const req = httpTestingController.expectOne(
        `http://localhost:5050/api/signup`
      );
      expect(req.request.method).toBe('POST');
      req.flush({ message: 'success' });
    });
  });

  describe('login', () => {
    it('should post and return data', () => {
      const expectedFormValues = {
        email: 'test@test.com',
        password: '12345678',
      };
      service.login(expectedFormValues).subscribe((res) => {
        expect(res).toEqual({ message: 'success' });
      });

      const req = httpTestingController.expectOne(
        `http://localhost:5050/api/login`
      );
      expect(req.request.method).toBe('POST');
      req.flush({ message: 'success' });
    });
  });

  describe('getAuthSessionItem', () => {
    it('should return a string from the passed in storage', () => {
      const token = '12345';

      sessionStorage.getItem.and.returnValue(token);

      const sessionItem = service.getAuthSessionItem(
        (sessionStorage as unknown) as Storage,
        'token'
      );

      expect(sessionItem).toBe(token);
    });
  });

  describe('setAuthSessionItems', () => {
    it('should call setItem on storage for the passed in token, expiry date and user id', () => {
      const token = 'abc123';
      const expiryDate = new Date();
      const isoString = '2020-05-13T08:56:42.801Z';
      const userId = '1';

      spyOn(expiryDate, 'toISOString').and.returnValue(isoString);

      service.setAuthSessionItems(
        (sessionStorage as unknown) as Storage,
        token,
        expiryDate,
        userId
      );

      expect(sessionStorage.setItem.calls.allArgs()).toEqual([
        ['expiryDate', isoString],
        ['token', token],
        ['userId', userId],
      ]);
    });
  });

  describe('updateIsAuth', () => {
    it('should call next on characterSource and update character', () => {
      service.updateIsAuth(true);

      service.isAuth$
        .pipe(take(1))
        .subscribe((isAuth) => expect(isAuth).toEqual(true));
    });
  });
});
