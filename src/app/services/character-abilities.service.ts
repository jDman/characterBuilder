import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, filter, distinctUntilChanged } from 'rxjs/operators';
import { isNonNull } from '../utils/isNonNull';
import { CharacterAbilities } from '../builder/interfaces/character-abilities.interface';
import { CharacterAbilitiesPostData } from '../builder/interfaces/character-abilities-post-data.interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterAbilitiesService {
  private abilitiesSource = new BehaviorSubject<CharacterAbilities>(undefined);
  abilities$: Observable<
    CharacterAbilities
  > = this.abilitiesSource
    .asObservable()
    .pipe(filter(isNonNull), distinctUntilChanged());

  constructor(private http: HttpClient) {}

  createAbilities(data: CharacterAbilitiesPostData): Observable<any> {
    return this.http
      .post<any>(
        `http://localhost:5050/api/abilities/add/${data.characterId}`,
        { ...data.abilities }
      )
      .pipe(
        catchError((err) => {
          return throwError(err.message);
        })
      );
  }

  editAbilities(data: CharacterAbilitiesPostData): Observable<any> {
    return this.http
      .put<any>(
        `http://localhost:5050/api/abilities/edit/${data.characterId}`,
        { ...data.abilities }
      )
      .pipe(
        catchError((err) => {
          return throwError(err.message);
        })
      );
  }

  fetchCharacterAbilities(characterId: string): Observable<CharacterAbilities> {
    return this.http
      .get<any>(`http://localhost:5050/api/abilities/${characterId}`)
      .pipe(
        map(({ abilities }) => {
          return abilities;
        }),
        catchError((err) => {
          return throwError(err.message);
        })
      );
  }

  updateAbilities(abilities: CharacterAbilities): void {
    const updatedAbilities = !!abilities ? { ...abilities } : undefined;

    this.abilitiesSource.next(updatedAbilities);
  }
}
