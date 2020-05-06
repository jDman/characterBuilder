import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-additional-character-information',
  templateUrl: './additional-character-information.component.html',
  styleUrls: ['./additional-character-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalCharacterInformationComponent {
  additionalCharacterUpdateOptions = [
    {
      title: 'Abilities',
    },
    {
      title: 'Equipment',
    },
    {
      title: 'Traits',
    },
  ];

  selection = 'abilities';

  updateSelection(option: string): void {
    this.selection = option.toLocaleLowerCase();
  }
}
