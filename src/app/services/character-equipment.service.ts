import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { CharacterEquipment } from '../builder/interfaces/character-equipment.interface';
import { isNonNull } from '../utils/isNonNull';
import { CharacterEquipmentPostData } from '../builder/interfaces/character-equipment-post-data.interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterEquipmentService {
  private equipmentSource = new BehaviorSubject<CharacterEquipment>(undefined);
  equipment: Observable<
    CharacterEquipment
  > = this.equipmentSource.asObservable().pipe(filter(isNonNull));

  constructor(private http: HttpClient) {}

  createEquipment(data: CharacterEquipmentPostData): Observable<any> {
    return this.http
      .post<any>(
        `http://localhost:5050/api/equipment/add/${data.characterId}`,
        { ...data.equipment }
      )
      .pipe(
        catchError((err) => {
          return throwError(err.message);
        })
      );
  }

  fetchCharacterEquipment(characterId: string): Observable<CharacterEquipment> {
    return this.http
      .get<any>(`http://localhost:5050/api/equipment/${characterId}`)
      .pipe(
        map(({ equipment }) => {
          this.updateEquipment(equipment);
          return equipment;
        }),
        catchError((err) => {
          return throwError(err.message);
        })
      );
  }

  updateEquipment(equipment: CharacterEquipment): void {
    this.equipmentSource.next(equipment);
  }
}
