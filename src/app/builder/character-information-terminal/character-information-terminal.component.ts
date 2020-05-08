import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-character-information-terminal',
  templateUrl: './character-information-terminal.component.html',
  styleUrls: ['./character-information-terminal.component.scss'],
})
export class CharacterInformationTerminalComponent {
  @Input() abilities: any;

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

  updateSelection(option: string): void {
    this.selection = option.toLocaleLowerCase();
  }
}
