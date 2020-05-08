import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-information-terminal',
  templateUrl: './character-information-terminal.component.html',
  styleUrls: ['./character-information-terminal.component.scss'],
})
export class CharacterInformationTerminalComponent implements OnInit {
  @Output() characterInfoSelection = new EventEmitter<string>();

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

  ngOnInit() {
    this.characterInfoSelection.emit(this.selection);
  }

  updateSelection(option: string): void {
    this.selection = option.toLocaleLowerCase();
    this.characterInfoSelection.emit(this.selection);
  }
}
