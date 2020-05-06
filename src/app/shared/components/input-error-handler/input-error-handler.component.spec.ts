import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputErrorHandlerComponent } from './input-error-handler.component';

describe('InputErrorHandlerComponent', () => {
  let component: InputErrorHandlerComponent;
  let fixture: ComponentFixture<InputErrorHandlerComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputErrorHandlerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputErrorHandlerComponent);
    component = fixture.componentInstance;
    component.errors = ['required', 'email'];
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display errors passed as input', () => {
    const errors = compiled.querySelectorAll('.input-error-handling__error');
    expect(errors[0].textContent).toBe('required');
    expect(errors[1].textContent).toBe('email');
  });
});
