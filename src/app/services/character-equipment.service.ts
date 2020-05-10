import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { filter, map, catchError, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { CharacterEquipment } from '../builder/interfaces/character-equipment.interface';
import { isNonNull } from '../utils/isNonNull';
import { CharacterEquipmentPostData } from '../builder/interfaces/character-equipment-post-data.interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterEquipmentService {
  private equipmentSource = new BehaviorSubject<CharacterEquipment>(undefined);
  equipment$: Observable<
    CharacterEquipment
  > = this.equipmentSource
    .asObservable()
    .pipe(filter(isNonNull), distinctUntilChanged());

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
          return equipment;
        }),
        catchError((err) => {
          return throwError(err.message);
        })
      );
  }

  updateEquipment(equipment: CharacterEquipment): void {
    const updatedEquipment = !!equipment ? { ...equipment } : undefined;

    this.equipmentSource.next(updatedEquipment);
  }
}
