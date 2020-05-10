import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAbilitiesComponent } from './character-abilities.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CharacterAbilitiesComponent', () => {
  let component: CharacterAbilitiesComponent;
  let fixture: ComponentFixture<CharacterAbilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterAbilitiesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterAbilitiesComponent);
    component = fixture.componentInstance;
    component.strength = 6;
    component.dexterity = 4;
    component.constitution = 9;
    component.intelligence = 7;
    component.wisdom = 8;
    component.charisma = 4;
    component.isEditing = false;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('editAbilities', () => {
    it('should call the editAbilitiesData emit method', () => {
      spyOn(component.editAbilitiesData, 'emit');

      component.editAbilities();

      expect(component.editAbilitiesData.emit).toHaveBeenCalled();
    });
  });
});
