import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterEquipmentFormComponent } from './character-equipment-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CharacterEquipment } from '../../interfaces/character-equipment.interface';

describe('CharacterEquipmentFormComponent', () => {
  let component: CharacterEquipmentFormComponent;
  let fixture: ComponentFixture<CharacterEquipmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CharacterEquipmentFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterEquipmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('create', () => {
    const mockedSubmitEvent = new Event('submit');

    it('should not call characterEquipmentFormSubmitted emit if form invalid', () => {
      spyOn(component.characterEquipmentFormSubmitted, 'emit');

      component.submitForm(mockedSubmitEvent);

      expect(
        component.characterEquipmentFormSubmitted.emit
      ).not.toHaveBeenCalled();
    });

    it('should call characterEquipmentFormSubmitted emit if form valid and not isEditing', () => {
      const expectedFormValues: CharacterEquipment = {
        armor_class: 2,
        weapon_proficiencies: 'martial',
        wealth: 100,
      };
      spyOn(component.characterEquipmentFormSubmitted, 'emit');

      component.characterEquipmentForm.controls.armor_class.setValue(
        expectedFormValues.armor_class
      );
      component.characterEquipmentForm.controls.weapon_proficiencies.setValue(
        expectedFormValues.weapon_proficiencies
      );
      component.characterEquipmentForm.controls.wealth.setValue(
        expectedFormValues.wealth
      );

      component.submitForm(mockedSubmitEvent);

      expect(
        component.characterEquipmentFormSubmitted.emit
      ).toHaveBeenCalledWith(expectedFormValues);
    });

    it('should not call characterEquipmentFormEdited emit if form invalid and isEditing', () => {
      spyOn(component.characterEquipmentFormEdited, 'emit');

      component.submitForm(mockedSubmitEvent);

      expect(
        component.characterEquipmentFormEdited.emit
      ).not.toHaveBeenCalled();
    });

    it('should call characterEquipmentFormEdited emit if form valid and isEditing', () => {
      const expectedFormValues: CharacterEquipment = {
        armor_class: 2,
        weapon_proficiencies: 'martial',
        wealth: 100,
      };
      spyOn(component.characterEquipmentFormEdited, 'emit');

      component.isEditing = true;

      fixture.detectChanges();

      component.characterEquipmentForm.controls.armor_class.setValue(
        expectedFormValues.armor_class
      );
      component.characterEquipmentForm.controls.weapon_proficiencies.setValue(
        expectedFormValues.weapon_proficiencies
      );
      component.characterEquipmentForm.controls.wealth.setValue(
        expectedFormValues.wealth
      );

      component.submitForm(mockedSubmitEvent);

      expect(component.characterEquipmentFormEdited.emit).toHaveBeenCalledWith(
        expectedFormValues
      );
    });
  });
});
