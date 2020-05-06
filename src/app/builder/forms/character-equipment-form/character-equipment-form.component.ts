import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-character-equipment-form',
  templateUrl: './character-equipment-form.component.html',
  styleUrls: ['./character-equipment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterEquipmentFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
