import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-character-base-form',
  templateUrl: './character-base-form.component.html',
  styleUrls: ['./character-base-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterBaseFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
