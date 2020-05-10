import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { CharacterInformationTerminalComponent } from './character-information-terminal.component';
import { CharacterAbilitiesService } from 'src/app/services/character-abilities.service';
import { CharacterAbilities } from '../interfaces/character-abilities.interface';
import { CharacterEquipmentService } from 'src/app/services/character-equipment.service';
import { CharacterTraitsService } from 'src/app/services/character-traits.service';
import { CharacterEquipment } from '../interfaces/character-equipment.interface';
import { CharacterTraits } from '../interfaces/character-traits.interface';

const mockedAbilities: CharacterAbilities = {
  strength: 8,
  dexterity: 7,
  constitution: 7,
  intelligence: 4,
  wisdom: 4,
  charisma: 3,
};

const mockedEquipment: CharacterEquipment = {
  armor_class: 1,
  weapon_proficiencies: 'martial',
  wealth: 100,
};

const mockedTraits: CharacterTraits = {
  ability_score_increase: 4,
  age: 20,
  alignment: 'lawful',
  morality: 'good',
  size: 'large',
  speed: 5,
  languages: 'common',
};

describe('CharacterInformationTerminalComponent', () => {
  let component: CharacterInformationTerminalComponent;
  let fixture: ComponentFixture<CharacterInformationTerminalComponent>;
  let compiled: any;

  let characterAbilitiesService;
  let characterEquipmentService;
  let characterTraitsService;
  let characterAbilitiesServiceStub: Partial<CharacterAbilitiesService>;
  let characterEquipmentServiceStub: Partial<CharacterEquipmentService>;
  let characterTraitsServiceStub: Partial<CharacterTraitsService>;

  characterAbilitiesServiceStub = {
    abilities$: of(mockedAbilities),
  };

  characterEquipmentServiceStub = {
    equipment$: of(mockedEquipment),
  };

  characterTraitsServiceStub = {
    traits$: of(mockedTraits),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterInformationTerminalComponent],
      providers: [
        {
          provide: CharacterAbilitiesService,
          useValue: characterAbilitiesServiceStub,
        },
        {
          provide: CharacterEquipmentService,
          useValue: characterEquipmentServiceStub,
        },
        {
          provide: CharacterTraitsService,
          useValue: characterTraitsServiceStub,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterInformationTerminalComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;

    component.characterId = '1';

    characterAbilitiesService = TestBed.inject(CharacterAbilitiesService);
    characterEquipmentService = TestBed.inject(CharacterEquipmentService);
    characterTraitsService = TestBed.inject(CharacterTraitsService);

    fixture.detectChanges();
  });

  it('should create and set component selection property to default abilities', () => {
    expect(component.selection).toBe('abilities');
  });

  it('should have three selection options in the terminal with correct text content', () => {
    const selectionList = compiled.querySelectorAll(
      '.character-information-terminal__selection'
    );
    expect(selectionList[0].textContent).toBe('Abilities');
    expect(selectionList[1].textContent).toBe('Equipment');
    expect(selectionList[2].textContent).toBe('Traits');
  });

  describe('updateSelection', () => {
    it('should update component selection property to passed in option string, lower casing it', () => {
      const option = 'Traits';

      component.updateSelection(option);

      expect(component.selection).toBe('traits');
    });
  });
});
