import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SignupComponent } from './signup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  let authService;
  let authServiceStub: Partial<AuthService>;

  authServiceStub = {
    signup: jasmine.createSpy(),
    fetchCookie: jasmine.createSpy(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SignupComponent],
      providers: [{ provide: AuthService, useValue: authServiceStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
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
        name: 'Tester',
        email: 'test@test.com',
        password: '12345678',
      };

      authService.signup.and.returnValue(of({}));

      component.formSubmission(expectedFormValues);

      expect(authService.signup).toHaveBeenCalledWith(expectedFormValues);
    });
  });
});
