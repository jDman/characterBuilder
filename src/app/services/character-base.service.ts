import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

import { CharacterBase } from '../builder/interfaces/character-base.interface';
import { catchError, map, filter, distinctUntilChanged } from 'rxjs/operators';

import { isNonNull } from '../utils/isNonNull';

@Injectable({
  providedIn: 'root',
})
export class CharacterBaseService {
  private charactersSource = new BehaviorSubject<Array<CharacterBase>>([]);
  private characterSource = new BehaviorSubject<CharacterBase>(undefined);

  characters$: Observable<
    Array<CharacterBase>
  > = this.charactersSource.asObservable().pipe(filter(isNonNull));
  character$: Observable<
    CharacterBase
  > = this.characterSource
    .asObservable()
    .pipe(filter(isNonNull), distinctUntilChanged());

  constructor(private http: HttpClient) {}

  createCharacter(body: CharacterBase): Observable<any> {
    return this.http.post<any>('/api/character/add', body).pipe(
      catchError((err) => {
        return throwError(err.message);
      })
    );
  }

  deleteCharacter(characterId: string): Observable<any> {
    return this.http.delete<any>(`/api/character/remove/${characterId}`).pipe(
      catchError((err) => {
        return throwError(err.message);
      })
    );
  }

  fetchAllCharacters(): Observable<Array<CharacterBase>> {
    return this.http.get<any>('/api/characters').pipe(
      map(({ characters }) => {
        this.updateCharacters(characters);
        return characters;
      }),
      catchError((err) => {
        return throwError(err.message);
      })
    );
  }

  fetchCharacter(id: string): Observable<CharacterBase> {
    return this.http.get<any>(`/api/character/${id}`).pipe(
      map(({ character }) => {
        return character;
      }),
      catchError((err) => {
        return throwError(err.message);
      })
    );
  }

  updateCharacters(characters: Array<CharacterBase>): void {
    this.charactersSource.next(characters);
  }

  updateCharacter(character: CharacterBase): void {
    const updatedCharacter = !!character ? { ...character } : undefined;

    this.characterSource.next(updatedCharacter);
  }
}
