import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-character-information-terminal',
  templateUrl: './character-information-terminal.component.html',
  styleUrls: ['./character-information-terminal.component.scss'],
})
export class CharacterInformationTerminalComponent {
  @Input() abilities: any;
  @Input() equipment: any;
  @Input() traits: any;

  characterInfoOptions = [
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

  submitAbilities(event: Event): void {
    console.log(event);
  }

  submitEquipment(event: Event): void {
    console.log(event);
  }

  updateSelection(option: string): void {
    this.selection = option.toLocaleLowerCase();
  }
}
