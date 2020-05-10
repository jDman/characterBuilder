import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAbilitiesFormComponent } from './character-abilities-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CharacterAbilitiesFormComponent', () => {
  let component: CharacterAbilitiesFormComponent;
  let fixture: ComponentFixture<CharacterAbilitiesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CharacterAbilitiesFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterAbilitiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
