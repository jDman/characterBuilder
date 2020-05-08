import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { CharacterTraitsService } from './character-traits.service';
import { CharacterTraits } from '../builder/interfaces/character-traits.interface';
import { take } from 'rxjs/operators';

const mockedTraits: CharacterTraits = {
  ability_score_increase: 4,
  age: 20,
  alignment: 'lawful',
  morality: 'good',
  size: 'large',
  speed: 5,
  languages: 'common',
};

describe('CharacterTraitsService', () => {
  let service: CharacterTraitsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(CharacterTraitsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchCharacterTraits', () => {
    it('should get and return character equipment', () => {
      const characterId = '1';
      service.fetchCharacterTraits(characterId).subscribe((res) => {
        expect(res).toEqual(mockedTraits);
      });

      const req = httpTestingController.expectOne(
        `http://localhost:5050/api/traits/${characterId}`
      );
      expect(req.request.method).toBe('GET');
      req.flush({ message: 'success', traits: mockedTraits });
    });
  });

  describe('updateTraits', () => {
    it('should call next on characterSource and update character', () => {
      service.updateTraits(mockedTraits);

      service.traits
        .pipe(take(1))
        .subscribe((equipment) => expect(equipment).toEqual(mockedTraits));
    });
  });
});
