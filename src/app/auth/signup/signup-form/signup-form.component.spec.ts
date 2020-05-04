import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { SignupFormComponent } from './signup-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupFormComponent],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have three form controls, name, email and password', () => {
    expect(component.signupForm.controls.name).toBeTruthy();
    expect(component.signupForm.controls.email).toBeTruthy();
    expect(component.signupForm.controls.password).toBeTruthy();
  });

  describe('signup', () => {
    const mockedSubmitEvent = new Event('submit');

    it('should not call signupFormSubmitted if form invalid', () => {
      spyOn(component.signupFormSubmitted, 'emit');

      component.signup(mockedSubmitEvent);

      expect(component.signupFormSubmitted.emit).not.toHaveBeenCalled();
    });

    it('should call signupFormSubmitted if form invalid', () => {
      const expectedFormValues = {
        name: 'Tester',
        email: 'test@test.com',
        password: '12345678',
      };
      spyOn(component.signupFormSubmitted, 'emit');

      component.signupForm.controls.name.setValue(expectedFormValues.name);
      component.signupForm.controls.email.setValue(expectedFormValues.email);
      component.signupForm.controls.password.setValue(
        expectedFormValues.password
      );

      component.signup(mockedSubmitEvent);

      expect(component.signupFormSubmitted.emit).toHaveBeenCalled();
    });
  });
});
