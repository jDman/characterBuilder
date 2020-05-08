import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

import { CharacterBase } from '../builder/interfaces/character-base.interface';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CharacterBaseService {
  private charactersSource = new BehaviorSubject<Array<CharacterBase>>([]);
  characters = this.charactersSource.asObservable();

  constructor(private http: HttpClient) {}

  fetchAllCharacters(): Observable<any> {
    return this.http.get<any>('http://localhost:5050/api/characters').pipe(
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
    return this.http.get<any>(`http://localhost:5050/api/character/${id}`).pipe(
      map(({ character }) => {
        return character;
      }),
      catchError((err) => {
        return throwError(err.message);
      })
    );
  }
  createCharacter(body: CharacterBase): Observable<any> {
    return this.http
      .post<any>('http://localhost:5050/api/character/add', body)
      .pipe(
        catchError((err) => {
          return throwError(err.message);
        })
      );
  }

  updateCharacters(characters: Array<CharacterBase>): void {
    this.charactersSource.next(characters);
  }
}
