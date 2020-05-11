import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-character-equipment',
  templateUrl: './character-equipment.component.html',
  styleUrls: ['./character-equipment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterEquipmentComponent {
  @Output() editEquipmentData = new EventEmitter();

  @Input() armorClass: number;
  @Input() weaponProficiencies: string;
  @Input() wealth: number;
  @Input() isEditing = false;

  editEquipment() {
    this.editEquipmentData.emit();
  }
}
