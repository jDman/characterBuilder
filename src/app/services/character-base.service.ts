import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { CharacterBase } from '../builder/interfaces/character-base.interface';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CharacterBaseService {
  constructor(private http: HttpClient) {}

  createCharacterBase(body: CharacterBase): Observable<any> {
    return this.http
      .post<CharacterBase>('http://localhost:5050/api/character/add', body)
      .pipe(
        catchError((err) => {
          return throwError(err.message);
        })
      );
  }
}
