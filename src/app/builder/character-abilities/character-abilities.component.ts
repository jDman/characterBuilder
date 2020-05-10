import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-character-abilities',
  templateUrl: './character-abilities.component.html',
  styleUrls: ['./character-abilities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterAbilitiesComponent {
  @Output() editAbilitiesData = new EventEmitter();

  @Input() strength: number;
  @Input() dexterity: number;
  @Input() constitution: number;
  @Input() intelligence: number;
  @Input() wisdom: number;
  @Input() charisma: number;
  @Input() isEditing = false;

  editAbilities() {
    this.editAbilitiesData.emit();
  }
}
