import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterEquipmentComponent } from './character-equipment.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CharacterEquipmentComponent', () => {
  let component: CharacterEquipmentComponent;
  let fixture: ComponentFixture<CharacterEquipmentComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterEquipmentComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterEquipmentComponent);
    component = fixture.componentInstance;
    component.armorClass = 2;
    component.weaponProficiencies = 'martial';
    component.wealth = 100;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create and display equipment as list items', () => {
    const listedAbilites = compiled.querySelectorAll(
      '.character-equipment__list-item'
    );

    expect(listedAbilites[0].textContent.trim()).toBe('Armor Class: (2)');
    expect(listedAbilites[1].textContent.trim()).toBe(
      'Weapon Proficiencies: (martial)'
    );
    expect(listedAbilites[2].textContent.trim()).toBe('Wealth: (100)');
  });

  describe('editEquipment', () => {
    it('should call the editAbilitiesData emit method', () => {
      spyOn(component.editEquipmentData, 'emit');

      component.editEquipment();

      expect(component.editEquipmentData.emit).toHaveBeenCalled();
    });
  });
});
