import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputErrorHandlerComponent } from './input-error-handler.component';

describe('InputErrorHandlerComponent', () => {
  let component: InputErrorHandlerComponent;
  let fixture: ComponentFixture<InputErrorHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputErrorHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputErrorHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
