import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-character-traits-form',
  templateUrl: './character-traits-form.component.html',
  styleUrls: ['./character-traits-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterTraitsFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
