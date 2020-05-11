import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterTraitsComponent } from './character-traits.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CharacterTraitsComponent', () => {
  let component: CharacterTraitsComponent;
  let fixture: ComponentFixture<CharacterTraitsComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterTraitsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterTraitsComponent);
    component = fixture.componentInstance;
    component.abilityScoreIncrease = 2;
    component.age = 33;
    component.alignment = 'lawful';
    component.morality = 'good';
    component.size = 'medium';
    component.speed = 4;
    component.languages = 'common';
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create and display traits as list items', () => {
    const listedAbilites = compiled.querySelectorAll(
      '.character-traits__list-item'
    );

    expect(listedAbilites[0].textContent.trim()).toBe(
      'Ability Score Increase: (2)'
    );
    expect(listedAbilites[1].textContent.trim()).toBe('Age: (33)');
    expect(listedAbilites[2].textContent.trim()).toBe('Alignment: (lawful)');
    expect(listedAbilites[3].textContent.trim()).toBe('Morality: (good)');
    expect(listedAbilites[4].textContent.trim()).toBe('Size: (medium)');
    expect(listedAbilites[5].textContent.trim()).toBe('Speed: (4)');
    expect(listedAbilites[6].textContent.trim()).toBe('Languages: (common)');
  });

  describe('editTraits', () => {
    it('should call the editAbilitiesData emit method', () => {
      spyOn(component.editTraitsData, 'emit');

      component.editTraits();

      expect(component.editTraitsData.emit).toHaveBeenCalled();
    });
  });
});
