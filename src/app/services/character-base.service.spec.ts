import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { CharacterBaseService } from './character-base.service';
import { CharacterBase } from '../builder/interfaces/character-base.interface';
import { take } from 'rxjs/operators';

describe('CharacterBaseService', () => {
  let service: CharacterBaseService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const mockCharacterBase: CharacterBase = {
    name: 'Tester',
    background: 'folk_hero',
    additional_info: '',
    classType: 'rogue',
    raceType: 'elf',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });

    service = TestBed.inject(CharacterBaseService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchAllCharacters', () => {
    it('should get and return characters', () => {
      const mockedResult = [{ ...mockCharacterBase, id: '1' }];
      service.fetchAllCharacters().subscribe((res) => {
        expect(res).toEqual(mockedResult);
      });

      const req = httpTestingController.expectOne(
        'http://localhost:5050/api/characters'
      );
      expect(req.request.method).toBe('GET');
      req.flush({ message: 'success', characters: mockedResult });
    });
  });

  describe('fetchCharacter', () => {
    it('should get and return a character', () => {
      const characterId = '1';
      service.fetchCharacter(characterId).subscribe((res) => {
        expect(res).toEqual(mockCharacterBase);
      });

      const req = httpTestingController.expectOne(
        `http://localhost:5050/api/character/${characterId}`
      );
      expect(req.request.method).toBe('GET');
      req.flush({ message: 'success', character: mockCharacterBase });
    });
  });

  describe('createCharacter', () => {
    it('should post and return data', () => {
      service.createCharacter({ ...mockCharacterBase }).subscribe((res) => {
        expect(res).toEqual({ message: 'success' });
      });

      const req = httpTestingController.expectOne(
        'http://localhost:5050/api/character/add'
      );
      expect(req.request.method).toBe('POST');
      req.flush({ message: 'success' });
    });
  });

  describe('updateCharacters', () => {
    it('should call next on charactersSource and update characters', () => {
      service.updateCharacters([mockCharacterBase]);

      service.characters$
        .pipe(take(1))
        .subscribe((character) =>
          expect(character).toEqual([mockCharacterBase])
        );
    });
  });

  describe('updateCharacter', () => {
    it('should call next on characterSource and update character', () => {
      service.updateCharacter(mockCharacterBase);

      service.character$
        .pipe(take(1))
        .subscribe((character) => expect(character).toEqual(mockCharacterBase));
    });
  });
});
