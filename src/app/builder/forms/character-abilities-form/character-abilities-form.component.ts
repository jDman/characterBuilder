import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-character-abilities-form',
  templateUrl: './character-abilities-form.component.html',
  styleUrls: ['./character-abilities-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterAbilitiesFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
