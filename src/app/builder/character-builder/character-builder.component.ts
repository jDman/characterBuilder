import { Component, ChangeDetectionStrategy } from '@angular/core';

import { CharacterBase } from '../interfaces/character-base.interface';
import { CharacterBaseService } from 'src/app/services/character-base.service';

@Component({
  selector: 'app-character-builder',
  templateUrl: './character-builder.component.html',
  styleUrls: ['./character-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterBuilderComponent {
  constructor(private characterBaseService: CharacterBaseService) {}

  submitCharacterBase(characterDetail: CharacterBase) {
    console.log(characterDetail);
    this.characterBaseService
      .createCharacterBase(characterDetail)
      .subscribe((response) => console.log(response));
  }
}
