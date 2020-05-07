import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { CharacterBaseService } from './character-base.service';
import { CharacterBase } from '../builder/interfaces/character-base.interface';

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

  describe('createCharacterBase', () => {
    it('should post and return data', () => {
      service.createCharacterBase({ ...mockCharacterBase }).subscribe((res) => {
        expect(res).toEqual({ msg: 'success' });
      });

      const req = httpTestingController.expectOne(
        'http://localhost:5050/api/character/add'
      );
      expect(req.request.method).toBe('POST');
      req.flush({ msg: 'success' });
    });
  });
});
