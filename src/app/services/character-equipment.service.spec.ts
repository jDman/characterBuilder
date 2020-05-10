import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { CharacterEquipmentService } from './character-equipment.service';
import { CharacterEquipment } from '../builder/interfaces/character-equipment.interface';
import { take } from 'rxjs/operators';

const mockedEquipment: CharacterEquipment = {
  armor_class: 1,
  weapon_proficiencies: 'martial',
  wealth: 100,
};

describe('CharacterEquipmentService', () => {
  let service: CharacterEquipmentService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(CharacterEquipmentService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createEquipment', () => {
    it('should post and return data', () => {
      const characterId = '1';
      service
        .createEquipment({ characterId, equipment: mockedEquipment })
        .subscribe((res) => {
          expect(res).toEqual({ message: 'success' });
        });

      const req = httpTestingController.expectOne(
        `http://localhost:5050/api/equipment/add/${characterId}`
      );
      expect(req.request.method).toBe('POST');
      req.flush({ message: 'success' });
    });
  });

  describe('fetchCharacterEquipment', () => {
    it('should get and return character equipment', () => {
      const characterId = '1';
      service.fetchCharacterEquipment(characterId).subscribe((res) => {
        expect(res).toEqual(mockedEquipment);
      });

      const req = httpTestingController.expectOne(
        `http://localhost:5050/api/equipment/${characterId}`
      );
      expect(req.request.method).toBe('GET');
      req.flush({ message: 'success', equipment: mockedEquipment });
    });
  });

  describe('updateEquipment', () => {
    it('should call next on characterSource and update character', () => {
      service.updateEquipment(mockedEquipment);

      service.equipment$
        .pipe(take(1))
        .subscribe((equipment) => expect(equipment).toEqual(mockedEquipment));
    });
  });
});
