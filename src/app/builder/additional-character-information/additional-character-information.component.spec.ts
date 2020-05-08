import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalCharacterInformationComponent } from './additional-character-information.component';
import { CharacterBaseService } from 'src/app/services/character-base.service';
import { CharacterAbilitiesService } from 'src/app/services/character-abilities.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CharacterBase } from '../interfaces/character-base.interface';
import { CharacterAbilities } from '../interfaces/character-abilities.interface';

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

describe('AdditionalCharacterInformationComponent', () => {
  let component: AdditionalCharacterInformationComponent;
  let fixture: ComponentFixture<AdditionalCharacterInformationComponent>;
  let compiled: any;

  let characterBaseService;
  let characterAbilitiesService;
  let characterBaseServiceStub: Partial<CharacterBaseService>;
  let characterAbilitiesServiceStub: Partial<CharacterAbilitiesService>;

  characterBaseServiceStub = {
    character: of(mockedCharacter),
    fetchCharacter: jasmine.createSpy(),
  };

  characterAbilitiesServiceStub = {
    abilities: of(mockedAbilities),
    fetchCharacterAbilities: jasmine.createSpy(),
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
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => ({
                  id: 123,
                }),
              },
            },
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

    characterBaseService.fetchCharacter.and.returnValue(of(mockedCharacter));
    characterAbilitiesService.fetchCharacterAbilities.and.returnValue(
      of(mockedAbilities)
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have character name as heading 1', () => {
    expect(compiled.querySelector('h1').textContent).toBe('Test');
  });

  it('should display character background, classType and raceType in pills', () => {
    const pills = compiled.querySelectorAll('.pill');

    expect(pills[0].textContent).toBe('criminal');
    expect(pills[1].textContent).toBe('human');
    expect(pills[2].textContent).toBe('warrior');
  });
});
