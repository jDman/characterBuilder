import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterTraitsFormComponent } from './character-traits-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CharacterTraits } from '../../interfaces/character-traits.interface';

describe('CharacterTraitsFormComponent', () => {
  let component: CharacterTraitsFormComponent;
  let fixture: ComponentFixture<CharacterTraitsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CharacterTraitsFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterTraitsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('create', () => {
    const mockedSubmitEvent = new Event('submit');

    it('should not call characterTraitsFormSubmitted emit if form invalid', () => {
      spyOn(component.characterTraitsFormSubmitted, 'emit');

      component.submitForm(mockedSubmitEvent);

      expect(
        component.characterTraitsFormSubmitted.emit
      ).not.toHaveBeenCalled();
    });

    it('should call characterTraitsFormSubmitted emit if form valid and not isEditing', () => {
      const expectedFormValues: CharacterTraits = {
        ability_score_increase: 3,
        age: 30,
        alignment: 'lawful',
        morality: 'good',
        size: 'large',
        speed: 3,
        languages: 'common',
      };
      spyOn(component.characterTraitsFormSubmitted, 'emit');

      component.characterTraitsForm.controls.ability_score_increase.setValue(
        expectedFormValues.ability_score_increase
      );
      component.characterTraitsForm.controls.age.setValue(
        expectedFormValues.age
      );
      component.characterTraitsForm.controls.alignment.setValue(
        expectedFormValues.alignment
      );
      component.characterTraitsForm.controls.morality.setValue(
        expectedFormValues.morality
      );
      component.characterTraitsForm.controls.size.setValue(
        expectedFormValues.size
      );
      component.characterTraitsForm.controls.speed.setValue(
        expectedFormValues.speed
      );
      component.characterTraitsForm.controls.languages.setValue(
        expectedFormValues.languages
      );

      component.submitForm(mockedSubmitEvent);

      expect(component.characterTraitsFormSubmitted.emit).toHaveBeenCalledWith(
        expectedFormValues
      );
    });

    it('should not call characterTraitsFormEdited emit if form invalid and isEditing', () => {
      spyOn(component.characterTraitsFormEdited, 'emit');

      component.submitForm(mockedSubmitEvent);

      expect(component.characterTraitsFormEdited.emit).not.toHaveBeenCalled();
    });

    it('should call characterTraitsFormEdited emit if form valid and isEditing', () => {
      const expectedFormValues: CharacterTraits = {
        ability_score_increase: 3,
        age: 30,
        alignment: 'lawful',
        morality: 'good',
        size: 'large',
        speed: 3,
        languages: 'common',
      };
      spyOn(component.characterTraitsFormEdited, 'emit');

      component.isEditing = true;

      fixture.detectChanges();

      component.characterTraitsForm.controls.ability_score_increase.setValue(
        expectedFormValues.ability_score_increase
      );
      component.characterTraitsForm.controls.age.setValue(
        expectedFormValues.age
      );
      component.characterTraitsForm.controls.alignment.setValue(
        expectedFormValues.alignment
      );
      component.characterTraitsForm.controls.morality.setValue(
        expectedFormValues.morality
      );
      component.characterTraitsForm.controls.size.setValue(
        expectedFormValues.size
      );
      component.characterTraitsForm.controls.speed.setValue(
        expectedFormValues.speed
      );
      component.characterTraitsForm.controls.languages.setValue(
        expectedFormValues.languages
      );

      component.submitForm(mockedSubmitEvent);

      expect(component.characterTraitsFormEdited.emit).toHaveBeenCalledWith(
        expectedFormValues
      );
    });
  });
});
