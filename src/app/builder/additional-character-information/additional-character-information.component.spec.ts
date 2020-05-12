import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalCharacterInformationComponent } from './additional-character-information.component';
import { CharacterBaseService } from 'src/app/services/character-base.service';
import { CharacterAbilitiesService } from 'src/app/services/character-abilities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CharacterBase } from '../interfaces/character-base.interface';
import { CharacterAbilities } from '../interfaces/character-abilities.interface';
import { CharacterEquipment } from '../interfaces/character-equipment.interface';
import { CharacterTraits } from '../interfaces/character-traits.interface';
import { CharacterEquipmentService } from 'src/app/services/character-equipment.service';
import { CharacterTraitsService } from 'src/app/services/character-traits.service';

const mockedCharacter: CharacterBase = {
  name: 'Test',
  background: 'criminal',
  additional_info: '',
  classType: 'warrior',
  raceType: 'human',
};

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

describe('AdditionalCharacterInformationComponent', () => {
  let component: AdditionalCharacterInformationComponent;
  let fixture: ComponentFixture<AdditionalCharacterInformationComponent>;
  let compiled: any;

  let characterBaseService;
  let characterAbilitiesService;
  let characterEquipmentService;
  let characterTraitsService;
  let characterBaseServiceStub: Partial<CharacterBaseService>;
  let characterAbilitiesServiceStub: Partial<CharacterAbilitiesService>;
  let characterEquipmentServiceStub: Partial<CharacterEquipmentService>;
  let characterTraitsServiceStub: Partial<CharacterTraitsService>;

  characterBaseServiceStub = {
    character$: of(mockedCharacter),
    deleteCharacter: jasmine.createSpy(),
    fetchCharacter: jasmine.createSpy(),
    updateCharacter: jasmine.createSpy(),
  };

  characterAbilitiesServiceStub = {
    abilities$: of(mockedAbilities),
    fetchCharacterAbilities: jasmine.createSpy(),
    editAbilities: jasmine.createSpy(),
    createAbilities: jasmine.createSpy(),
    updateAbilities: jasmine.createSpy(),
  };

  characterEquipmentServiceStub = {
    equipment$: of(mockedEquipment),
    fetchCharacterEquipment: jasmine.createSpy(),
    editEquipment: jasmine.createSpy(),
    createEquipment: jasmine.createSpy(),
    updateEquipment: jasmine.createSpy(),
  };

  characterTraitsServiceStub = {
    traits$: of(mockedTraits),
    fetchCharacterTraits: jasmine.createSpy(),
    editTraits: jasmine.createSpy(),
    createTraits: jasmine.createSpy(),
    updateTraits: jasmine.createSpy(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AdditionalCharacterInformationComponent],
      providers: [
        { provide: CharacterBaseService, useValue: characterBaseServiceStub },
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
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 123,
              },
            },
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy(),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalCharacterInformationComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;

    characterBaseService = TestBed.inject(CharacterBaseService);

    characterAbilitiesService = TestBed.inject(CharacterAbilitiesService);
    characterEquipmentService = TestBed.inject(CharacterEquipmentService);
    characterTraitsService = TestBed.inject(CharacterTraitsService);

    characterBaseService.fetchCharacter.and.returnValue(of(mockedCharacter));
    characterAbilitiesService.fetchCharacterAbilities.and.returnValue(
      of(mockedAbilities)
    );
    characterEquipmentService.fetchCharacterEquipment.and.returnValue(
      of(mockedEquipment)
    );
    characterTraitsService.fetchCharacterTraits.and.returnValue(
      of(mockedTraits)
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have character name as heading 1', () => {
    expect(compiled.querySelector('h1').textContent.trim()).toBe('Test');
  });

  it('should display character background, classType and raceType in pills', () => {
    const pills = compiled.querySelectorAll('.pill');

    expect(pills[0].textContent).toBe('criminal');
    expect(pills[1].textContent).toBe('human');
    expect(pills[2].textContent).toBe('warrior');
  });

  describe('deleteCharacter', () => {
    it('should call the character base service deleteCharacter method', () => {
      characterBaseService.deleteCharacter.and.callFake(() => of({}));

      component.deleteCharacter();

      expect(characterBaseService.deleteCharacter).toHaveBeenCalledWith(123);
    });
  });

  describe('editCharacterAbilities', () => {
    it('should call the abilities service editAbilities', () => {
      characterAbilitiesService.editAbilities.and.callFake(() => of({}));
      const characterAbilities = {
        characterId: '1',
        abilities: mockedAbilities,
      };

      component.editCharacterAbilities(characterAbilities);

      expect(characterAbilitiesService.editAbilities).toHaveBeenCalledWith(
        characterAbilities
      );
    });
  });

  describe('editCharacterEquipment', () => {
    it('should call the equipment service editEquipment', () => {
      characterEquipmentService.editEquipment.and.callFake(() => of({}));
      const characterEquipment = {
        characterId: '1',
        equipment: mockedEquipment,
      };

      component.editCharacterEquipment(characterEquipment);

      expect(characterEquipmentService.editEquipment).toHaveBeenCalledWith(
        characterEquipment
      );
    });
  });

  describe('editCharacterTraits', () => {
    it('should call the traits service editTraits', () => {
      characterTraitsService.editTraits.and.callFake(() => of({}));
      const characterTraits = {
        characterId: '1',
        traits: mockedTraits,
      };

      component.editCharacterTraits(characterTraits);

      expect(characterTraitsService.editTraits).toHaveBeenCalledWith(
        characterTraits
      );
    });
  });

  describe('fetchAbilities', () => {
    it('should call the abilities service fetchCharacterAbilities', () => {
      characterAbilitiesService.fetchCharacterAbilities.and.callFake(() =>
        of({})
      );
      const characterId = '1';

      component.fetchAbilities(characterId);

      expect(
        characterAbilitiesService.fetchCharacterAbilities
      ).toHaveBeenCalledWith(characterId);
    });
  });

  describe('fetchEquipment', () => {
    it('should call the equipment service fetchCharacterEquipment', () => {
      characterEquipmentService.fetchCharacterEquipment.and.callFake(() =>
        of({})
      );
      const characterId = '1';

      component.fetchEquipment(characterId);

      expect(
        characterEquipmentService.fetchCharacterEquipment
      ).toHaveBeenCalledWith(characterId);
    });
  });

  describe('fetchTraits', () => {
    it('should call the traits service fetchCharacterTraits', () => {
      characterTraitsService.fetchCharacterTraits.and.callFake(() => of({}));
      const characterId = '1';

      component.fetchTraits(characterId);

      expect(characterTraitsService.fetchCharacterTraits).toHaveBeenCalledWith(
        characterId
      );
    });
  });

  describe('submitCharacterAbilities', () => {
    it('should call the abilities service createAbilities', () => {
      characterAbilitiesService.createAbilities.and.callFake(() => of({}));
      const characterAbilities = {
        characterId: '1',
        abilities: mockedAbilities,
      };

      component.submitCharacterAbilities(characterAbilities);

      expect(characterAbilitiesService.createAbilities).toHaveBeenCalledWith(
        characterAbilities
      );
    });
  });

  describe('submitCharacterEquipment', () => {
    it('should call the equipment service createEquipment', () => {
      characterEquipmentService.createEquipment.and.callFake(() => of({}));
      const characterEquipment = {
        characterId: '1',
        equipment: mockedEquipment,
      };

      component.submitCharacterEquipment(characterEquipment);

      expect(characterEquipmentService.createEquipment).toHaveBeenCalledWith(
        characterEquipment
      );
    });
  });

  describe('submitCharacterTraits', () => {
    it('should call the traits service createTraits', () => {
      characterTraitsService.createTraits.and.callFake(() => of({}));
      const characterTraits = {
        characterId: '1',
        traits: mockedTraits,
      };

      component.submitCharacterTraits(characterTraits);

      expect(characterTraitsService.createTraits).toHaveBeenCalledWith(
        characterTraits
      );
    });
  });
});
