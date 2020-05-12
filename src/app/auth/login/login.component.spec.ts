import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let authService;
  let authServiceStub: Partial<AuthService>;

  authServiceStub = {
    login: jasmine.createSpy(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LoginComponent],
      providers: [{ provide: AuthService, useValue: authServiceStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('formSubmission', () => {
    it('should call signup on the authService', () => {
      const expectedFormValues = {
        email: 'test@test.com',
        password: '12345678',
      };

      authService.login.and.returnValue(of({}));

      component.formSubmission(expectedFormValues);

      expect(authService.login).toHaveBeenCalledWith(expectedFormValues);
    });
  });
});
