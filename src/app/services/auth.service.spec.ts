import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

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
});
