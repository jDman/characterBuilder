import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAbilitiesComponent } from './character-abilities.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CharacterAbilitiesComponent', () => {
  let component: CharacterAbilitiesComponent;
  let fixture: ComponentFixture<CharacterAbilitiesComponent>;
  let compiled: any;

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

    compiled = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should create and display abilities as list items', () => {
    const listedAbilites = compiled.querySelectorAll(
      '.character-abilities__list-item'
    );

    expect(listedAbilites[0].textContent.trim()).toBe('Strength: (6)');
    expect(listedAbilites[1].textContent.trim()).toBe('Dexterity: (4)');
    expect(listedAbilites[2].textContent.trim()).toBe('Constitution: (9)');
    expect(listedAbilites[3].textContent.trim()).toBe('Intelligence: (7)');
    expect(listedAbilites[4].textContent.trim()).toBe('Wisdom: (8)');
    expect(listedAbilites[5].textContent.trim()).toBe('Charisma: (4)');
  });

  describe('editAbilities', () => {
    it('should call the editAbilitiesData emit method', () => {
      spyOn(component.editAbilitiesData, 'emit');

      component.editAbilities();

      expect(component.editAbilitiesData.emit).toHaveBeenCalled();
    });
  });
});
