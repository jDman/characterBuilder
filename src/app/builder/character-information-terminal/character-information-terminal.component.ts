import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CharacterAbilities } from '../interfaces/character-abilities.interface';
import { CharacterEquipment } from '../interfaces/character-equipment.interface';
import { CharacterTraits } from '../interfaces/character-traits.interface';

@Component({
  selector: 'app-character-information-terminal',
  templateUrl: './character-information-terminal.component.html',
  styleUrls: ['./character-information-terminal.component.scss'],
})
export class CharacterInformationTerminalComponent {
  @Input() characterId: string;
  @Input() abilities: any;
  @Input() equipment: any;
  @Input() traits: any;

  @Output() submitAbilitiesData = new EventEmitter();
  @Output() submitEquipmentData = new EventEmitter();
  @Output() submitTraitsData = new EventEmitter();

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

  submitAbilities(abilities: CharacterAbilities): void {
    this.submitAbilitiesData.emit({ characterId: this.characterId, abilities });
  }

  submitEquipment(equipment: CharacterEquipment): void {
    this.submitEquipmentData.emit({ characterId: this.characterId, equipment });
  }

  submitTraits(traits: CharacterTraits): void {
    this.submitTraitsData.emit({ characterId: this.characterId, traits });
  }

  updateSelection(option: string): void {
    this.selection = option.toLocaleLowerCase();
  }
}
