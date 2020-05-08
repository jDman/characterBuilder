import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';

import { CharacterTraits } from '../builder/interfaces/character-traits.interface';
import { isNonNull } from '../utils/isNonNull';

@Injectable({
  providedIn: 'root',
})
export class CharacterTraitsService {
  private traitsSource = new BehaviorSubject<CharacterTraits>(undefined);
  traits: Observable<CharacterTraits> = this.traitsSource
    .asObservable()
    .pipe(filter(isNonNull));

  constructor(private http: HttpClient) {}

  fetchCharacterTraits(characterId: string): Observable<CharacterTraits> {
    return this.http
      .get<any>(`http://localhost:5050/api/traits/${characterId}`)
      .pipe(
        map(({ traits }) => {
          this.updateTraits(traits);
          return traits;
        }),
        catchError((err) => {
          return throwError(err.message);
        })
      );
  }

  updateTraits(traits: CharacterTraits): void {
    this.traitsSource.next(traits);
  }
}
