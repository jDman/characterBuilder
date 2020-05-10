import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { filter, map, catchError, distinctUntilChanged } from 'rxjs/operators';

import { CharacterTraits } from '../builder/interfaces/character-traits.interface';
import { isNonNull } from '../utils/isNonNull';
import { CharacterTraitsPostData } from '../builder/interfaces/character-traits-post-data.interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterTraitsService {
  private traitsSource = new BehaviorSubject<CharacterTraits>(undefined);
  traits: Observable<CharacterTraits> = this.traitsSource
    .asObservable()
    .pipe(filter(isNonNull), distinctUntilChanged());

  constructor(private http: HttpClient) {}

  createTraits(data: CharacterTraitsPostData): Observable<any> {
    return this.http
      .post<any>(`http://localhost:5050/api/traits/add/${data.characterId}`, {
        ...data.traits,
      })
      .pipe(
        catchError((err) => {
          return throwError(err.message);
        })
      );
  }

  fetchCharacterTraits(characterId: string): Observable<CharacterTraits> {
    return this.http
      .get<any>(`http://localhost:5050/api/traits/${characterId}`)
      .pipe(
        map(({ traits }) => {
          return traits;
        }),
        catchError((err) => {
          return throwError(err.message);
        })
      );
  }

  updateTraits(traits: CharacterTraits): void {
    const updatedTraits = !!traits ? { ...traits } : undefined;

    this.traitsSource.next(updatedTraits);
  }
}
