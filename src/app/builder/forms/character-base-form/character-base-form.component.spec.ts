import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterBaseFormComponent } from './character-base-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CharacterBaseFormComponent', () => {
  let component: CharacterBaseFormComponent;
  let fixture: ComponentFixture<CharacterBaseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CharacterBaseFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterBaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('create', () => {
    const mockedSubmitEvent = new Event('submit');

    it('should not call signupFormSubmitted emit if form invalid', () => {
      spyOn(component.characterBaseFormSubmitted, 'emit');

      component.create(mockedSubmitEvent);

      expect(component.characterBaseFormSubmitted.emit).not.toHaveBeenCalled();
    });

    it('should call signupFormSubmitted emit if form valid', () => {
      const expectedFormValues = {
        name: 'Tester',
        background: 'acolyte',
        additional_info: '',
        classType: 'warrior',
        raceType: 'human',
      };
      spyOn(component.characterBaseFormSubmitted, 'emit');

      component.characterBaseForm.controls.name.setValue(
        expectedFormValues.name
      );
      component.characterBaseForm.controls.background.setValue(
        expectedFormValues.background
      );
      component.characterBaseForm.controls.additional_info.setValue(
        expectedFormValues.additional_info
      );
      component.characterBaseForm.controls.classType.setValue(
        expectedFormValues.classType
      );
      component.characterBaseForm.controls.raceType.setValue(
        expectedFormValues.raceType
      );

      component.create(mockedSubmitEvent);

      expect(component.characterBaseFormSubmitted.emit).toHaveBeenCalledWith(
        expectedFormValues
      );
    });
  });
});
