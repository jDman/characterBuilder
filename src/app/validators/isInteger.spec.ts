import { TestBed, ComponentFixture } from '@angular/core/testing';

import { isIntegerValidator } from './isInteger';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

describe('isIntegerValidator', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should return null if value is an integer', () => {
    component.form.controls.field1.setValue('10');

    expect(component.form.controls.field1.hasError('notInteger')).toBe(false);
  });

  it('should return an error if value is not an integer', () => {
    component.form.controls.field2.setValue('a');

    expect(component.form.controls.field2.hasError('notInteger')).toBe(true);
  });
});

@Component({
  template: `<form [formGroup]="form">
    <input name="field1" type="number" class="number-field" />
    <input name="field2" type="text" class="text-field" />
  </form>`,
})
class TestComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      field1: ['', isIntegerValidator()],
      field2: ['', isIntegerValidator()],
    });
  }
}
