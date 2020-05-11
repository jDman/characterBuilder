import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAbilitiesFormComponent } from './character-abilities-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CharacterAbilities } from '../../interfaces/character-abilities.interface';

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

  describe('submitForm', () => {
    const mockedSubmitEvent = new Event('submit');

    it('should not call characterAbilitiesFormSubmitted emit if form invalid', () => {
      spyOn(component.characterAbilitiesFormSubmitted, 'emit');

      component.submitForm(mockedSubmitEvent);

      expect(
        component.characterAbilitiesFormSubmitted.emit
      ).not.toHaveBeenCalled();
    });

    it('should call characterAbilitiesFormSubmitted emit if form valid and not isEditing', () => {
      const expectedFormValues: CharacterAbilities = {
        strength: 5,
        dexterity: 7,
        constitution: 6,
        intelligence: 8,
        wisdom: 7,
        charisma: 5,
      };
      spyOn(component.characterAbilitiesFormSubmitted, 'emit');

      component.characterAbilitiesForm.controls.strength.setValue(
        expectedFormValues.strength
      );
      component.characterAbilitiesForm.controls.dexterity.setValue(
        expectedFormValues.dexterity
      );
      component.characterAbilitiesForm.controls.constitution.setValue(
        expectedFormValues.constitution
      );
      component.characterAbilitiesForm.controls.intelligence.setValue(
        expectedFormValues.intelligence
      );
      component.characterAbilitiesForm.controls.wisdom.setValue(
        expectedFormValues.wisdom
      );
      component.characterAbilitiesForm.controls.charisma.setValue(
        expectedFormValues.charisma
      );

      component.submitForm(mockedSubmitEvent);

      expect(
        component.characterAbilitiesFormSubmitted.emit
      ).toHaveBeenCalledWith(expectedFormValues);
    });

    it('should not call characterAbilitiesFormEditted emit if form invalid and isEditing', () => {
      spyOn(component.characterAbilitiesFormEditted, 'emit');

      component.isEditing = true;

      fixture.detectChanges();

      component.submitForm(mockedSubmitEvent);

      expect(
        component.characterAbilitiesFormEditted.emit
      ).not.toHaveBeenCalled();
    });

    it('should call characterAbilitiesFormEditted emit if form valid and isEditing', () => {
      const expectedFormValues: CharacterAbilities = {
        strength: 5,
        dexterity: 7,
        constitution: 6,
        intelligence: 8,
        wisdom: 7,
        charisma: 5,
      };
      spyOn(component.characterAbilitiesFormEditted, 'emit');

      component.isEditing = true;

      fixture.detectChanges();

      component.characterAbilitiesForm.controls.strength.setValue(
        expectedFormValues.strength
      );
      component.characterAbilitiesForm.controls.dexterity.setValue(
        expectedFormValues.dexterity
      );
      component.characterAbilitiesForm.controls.constitution.setValue(
        expectedFormValues.constitution
      );
      component.characterAbilitiesForm.controls.intelligence.setValue(
        expectedFormValues.intelligence
      );
      component.characterAbilitiesForm.controls.wisdom.setValue(
        expectedFormValues.wisdom
      );
      component.characterAbilitiesForm.controls.charisma.setValue(
        expectedFormValues.charisma
      );

      component.submitForm(mockedSubmitEvent);

      expect(component.characterAbilitiesFormEditted.emit).toHaveBeenCalledWith(
        expectedFormValues
      );
    });
  });
});
