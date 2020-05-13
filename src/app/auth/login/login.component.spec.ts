import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let authService: any;
  let authServiceStub: Partial<AuthService>;

  authServiceStub = {
    setAuthSessionItems: jasmine.createSpy(),
    login: jasmine.createSpy(),
    updateIsAuth: jasmine.createSpy(),
  };

  let router: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: Router, useValue: { navigate: jasmine.createSpy() } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('formSubmission', () => {
    it('should call login on the authService followed by setAuthSessionItems, updateIsAuth and then navigate via the router', () => {
      const expectedFormValues = {
        email: 'test@test.com',
        password: '12345678',
      };

      authService.login.and.returnValue(of({}));

      component.formSubmission(expectedFormValues);

      expect(authService.login).toHaveBeenCalledWith(expectedFormValues);
      expect(authService.setAuthSessionItems).toHaveBeenCalled();
      expect(authService.updateIsAuth).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});
