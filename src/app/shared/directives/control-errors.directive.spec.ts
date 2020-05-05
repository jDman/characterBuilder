import { Component, DebugElement, NgModule } from '@angular/core';

import { ControlErrorsDirective } from './control-errors.directive';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { InputErrorHandlerComponent } from '../components/input-error-handler/input-error-handler.component';

const testFormGroup = new FormGroup({ test: new FormControl() });

@Component({
  template: `<form [formGroup]="form">
    <input type="email" formControlName="test" appControlErrors />
  </form>`,
})
class TestInputComponent {
  form = testFormGroup;
}

describe('ControlErrorsDirectiveDirective', () => {
  let component: TestInputComponent;
  let fixture: ComponentFixture<TestInputComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        TestInputComponent,
        InputErrorHandlerComponent,
        ControlErrorsDirective,
      ],
    });

    fixture = TestBed.createComponent(TestInputComponent);
    component = fixture.componentInstance;
    component.form.controls.test.setValidators(Validators.email);
    inputEl = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  it('should instantiate the component it is used with', () => {
    expect(component).toBeTruthy();
    expect(inputEl).toBeTruthy();
  });

  it('should display an error handling component when an input control has an error after its value has been changed', async () => {
    component.form.controls.test.setValue('a');

    const errorEl = fixture.debugElement.query(By.css('.input-error'));

    await expect(errorEl).toBeTruthy();
  });
});
