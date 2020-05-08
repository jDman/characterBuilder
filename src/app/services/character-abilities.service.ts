import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';
import { isNonNull } from '../utils/isNonNull';
import { CharacterAbilities } from '../builder/interfaces/character-abilities.interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterAbilitiesService {
  private abilitiesSource = new BehaviorSubject<CharacterAbilities>(undefined);
  abilities: Observable<
    CharacterAbilities
  > = this.abilitiesSource.asObservable().pipe(filter(isNonNull));

  constructor(private http: HttpClient) {}

  fetchCharacterAbilities(characterId: string): Observable<CharacterAbilities> {
    return this.http
      .get<any>(`http://localhost:5050/api/abilities/${characterId}`)
      .pipe(
        map(({ abilities }) => {
          this.updateAbilities(abilities);
          return abilities;
        }),
        catchError((err) => {
          return throwError(err.message);
        })
      );
  }

  updateAbilities(abilities: CharacterAbilities): void {
    this.abilitiesSource.next(abilities);
  }
}
