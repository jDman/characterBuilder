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

  describe('startEditAbilities', () => {
    it('should change the isEditingAbilities flag', () => {
      component.startEditAbilities();

      expect(component.isEditingAbilities).toBeTrue();
    });
  });

  describe('startEditEquipment', () => {
    it('should change the isEditingEquipment flag', () => {
      component.startEditEquipment();

      expect(component.isEditingEquipment).toBeTrue();
    });
  });

  describe('startEditTraits', () => {
    it('should change the isEditingTraits flag', () => {
      component.startEditTraits();

      expect(component.isEditingTraits).toBeTrue();
    });
  });

  describe('editAbilities', () => {
    it('should call editAbilitiesData emit with data passed to it', () => {
      spyOn(component.editAbilitiesData, 'emit');
      const expectedCallObject = {
        characterId: component.characterId,
        abilities: mockedAbilities,
      };

      component.editAbilities(mockedAbilities);

      expect(component.editAbilitiesData.emit).toHaveBeenCalledWith(
        expectedCallObject
      );
    });
  });

  describe('editEquipment', () => {
    it('should call editEquipmentData emit with data passed to it', () => {
      spyOn(component.editEquipmentData, 'emit');
      const expectedCallObject = {
        characterId: component.characterId,
        equipment: mockedEquipment,
      };

      component.editEquipment(mockedEquipment);

      expect(component.editEquipmentData.emit).toHaveBeenCalledWith(
        expectedCallObject
      );
    });
  });

  describe('editTraits', () => {
    it('should call editEquipmentData emit with data passed to it', () => {
      spyOn(component.editTraitsData, 'emit');
      const expectedCallObject = {
        characterId: component.characterId,
        traits: mockedTraits,
      };

      component.editTraits(mockedTraits);

      expect(component.editTraitsData.emit).toHaveBeenCalledWith(
        expectedCallObject
      );
    });
  });

  describe('submitAbilities', () => {
    it('should call submitAbilitiesData emit with data passed to it', () => {
      spyOn(component.submitAbilitiesData, 'emit');
      const expectedCallObject = {
        characterId: component.characterId,
        abilities: mockedAbilities,
      };

      component.submitAbilities(mockedAbilities);

      expect(component.submitAbilitiesData.emit).toHaveBeenCalledWith(
        expectedCallObject
      );
    });
  });

  describe('submitEquipment', () => {
    it('should call submitEquipmentData emit with data passed to it', () => {
      spyOn(component.submitEquipmentData, 'emit');
      const expectedCallObject = {
        characterId: component.characterId,
        equipment: mockedEquipment,
      };

      component.submitEquipment(mockedEquipment);

      expect(component.submitEquipmentData.emit).toHaveBeenCalledWith(
        expectedCallObject
      );
    });
  });

  describe('submitTraits', () => {
    it('should call submitTraitsData emit with data passed to it', () => {
      spyOn(component.submitTraitsData, 'emit');
      const expectedCallObject = {
        characterId: component.characterId,
        traits: mockedTraits,
      };

      component.submitTraits(mockedTraits);

      expect(component.submitTraitsData.emit).toHaveBeenCalledWith(
        expectedCallObject
      );
    });
  });

  describe('updateSelection', () => {
    it('should update component selection property to passed in option string, lower casing it', () => {
      const option = 'Traits';

      component.updateSelection(option);

      expect(component.selection).toBe('traits');
    });
  });
});
