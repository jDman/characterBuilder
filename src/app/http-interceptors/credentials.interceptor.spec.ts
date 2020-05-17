import { TestBed } from '@angular/core/testing';
import { HttpRequest } from '@angular/common/http';

import { CredentialsInterceptor } from './credentials.interceptor';
import { AuthService } from '../services/auth.service';

describe('CredentialsInterceptor', () => {
  let interceptor: CredentialsInterceptor;
  let authService;
  let authServiceStub: Partial<AuthService>;

  const optionsReq = new HttpRequest('OPTIONS', '/api/endpoint');
  const req = new HttpRequest('DELETE', '/api/endpoint');

  authServiceStub = {
    getAuthSessionItem: jasmine.createSpy(),
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        CredentialsInterceptor,
        {
          provide: AuthService,
          useValue: authServiceStub,
        },
      ],
    })
  );

  beforeEach(() => {
    interceptor = TestBed.inject(CredentialsInterceptor);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  describe('intercept', () => {
    it('should make no changes to the request if options request', () => {
      const next = { handle: jasmine.createSpy() };
      authService.getAuthSessionItem.and.callFake(() => undefined);

      interceptor.intercept(optionsReq, next);

      expect(next.handle).toHaveBeenCalledWith(optionsReq);
    });

    it('should add authorization header if auth token returned', () => {
      const authToken = '123';
      const next = { handle: jasmine.createSpy() };
      const expectedRequest = optionsReq.clone({
        setHeaders: {
          Authorization: 'Bearer ' + authToken,
        },
      });
      authService.getAuthSessionItem.and.callFake(() => authToken);

      interceptor.intercept(optionsReq, next);

      expect(next.handle).toHaveBeenCalledWith(expectedRequest);
    });

    it('should add x-xsrf-token header if cookie found', () => {
      const cookie = 'XSRF_TOKEN=1234567;';
      const next = { handle: jasmine.createSpy() };
      const expectedRequest = req.clone({
        setHeaders: {
          'x-xsrf-token': '1234567',
        },
      });
      spyOnProperty(document, 'cookie', 'get').and.returnValue(cookie);

      authService.getAuthSessionItem.and.callFake(() => undefined);

      interceptor.intercept(req, next);

      expect(next.handle).toHaveBeenCalledWith(expectedRequest);
    });
  });
});
