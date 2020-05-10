import { TestBed } from '@angular/core/testing';

import { CharacterAbilitiesService } from './character-abilities.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { CharacterAbilities } from '../builder/interfaces/character-abilities.interface';

const mockedAbilities: CharacterAbilities = {
  strength: 8,
  dexterity: 7,
  constitution: 7,
  intelligence: 4,
  wisdom: 4,
  charisma: 3,
};

describe('CharacterAbilitiesService', () => {
  let service: CharacterAbilitiesService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(CharacterAbilitiesService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createAbilities', () => {
    it('should post and return data', () => {
      const characterId = '1';
      service
        .createAbilities({ characterId, abilities: mockedAbilities })
        .subscribe((res) => {
          expect(res).toEqual({ message: 'success' });
        });

      const req = httpTestingController.expectOne(
        `http://localhost:5050/api/abilities/add/${characterId}`
      );
      expect(req.request.method).toBe('POST');
      req.flush({ message: 'success' });
    });
  });

  describe('fetchCharacterAbilities', () => {
    it('should get and return character abilities', () => {
      const characterId = '1';
      service.fetchCharacterAbilities(characterId).subscribe((res) => {
        expect(res).toEqual(mockedAbilities);
      });

      const req = httpTestingController.expectOne(
        `http://localhost:5050/api/abilities/${characterId}`
      );
      expect(req.request.method).toBe('GET');
      req.flush({ message: 'success', abilities: mockedAbilities });
    });
  });
});
