import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CharacterBase } from '../interfaces/character-base.interface';
import { CharacterBaseService } from 'src/app/services/character-base.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-character-builder',
  templateUrl: './character-builder.component.html',
  styleUrls: ['./character-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterBuilderComponent implements OnInit {
  characters$: Observable<Array<CharacterBase>>;

  constructor(private characterBaseService: CharacterBaseService) {}

  ngOnInit() {
    this.characterBaseService.fetchAllCharacters().pipe(take(1)).subscribe();
    this.characters$ = this.characterBaseService.characters;
  }

  submitCharacterBase(characterDetail: CharacterBase) {
    this.characterBaseService
      .createCharacter(characterDetail)
      .subscribe((response) => console.log(response));
  }
}
