import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CharacterBuilderComponent } from './character-builder.component';
import { CharacterBaseService } from 'src/app/services/character-base.service';
import { CharacterBase } from '../interfaces/character-base.interface';
import { of } from 'rxjs';

const mockedCharacters: Array<CharacterBase> = [
  {
    name: 'Test',
    background: 'criminal',
    additional_info: '',
    classType: 'warrior',
    raceType: 'human',
  },
];

describe('CharacterBuilderComponent', () => {
  let component: CharacterBuilderComponent;
  let fixture: ComponentFixture<CharacterBuilderComponent>;

  let characterBaseService;
  let characterBaseServiceStub: Partial<CharacterBaseService>;

  characterBaseServiceStub = {
    characters$: of(mockedCharacters),
    fetchAllCharacters: jasmine.createSpy(),
    createCharacter: jasmine.createSpy(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CharacterBuilderComponent],
      providers: [
        { provide: CharacterBaseService, useValue: characterBaseServiceStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterBuilderComponent);
    component = fixture.componentInstance;

    characterBaseService = TestBed.inject(CharacterBaseService);

    characterBaseService.fetchAllCharacters.and.returnValue(
      of(mockedCharacters)
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submitCharacterBase', () => {
    it('should call createCharacter on characterBaseService with passed in data followed by fetchAllCharactersthen', () => {
      const characterDetail = { ...mockedCharacters[0] };

      characterBaseService.createCharacter.and.returnValue(of({}));

      component.submitCharacterBase(characterDetail);

      expect(characterBaseService.createCharacter).toHaveBeenCalledWith(
        characterDetail
      );
      expect(characterBaseService.fetchAllCharacters).toHaveBeenCalled();
    });
  });
});
