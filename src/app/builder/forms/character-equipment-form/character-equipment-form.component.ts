import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { CharacterEquipment } from '../../interfaces/character-equipment.interface';

@Component({
  selector: 'app-character-equipment-form',
  templateUrl: './character-equipment-form.component.html',
  styleUrls: ['./character-equipment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterEquipmentFormComponent implements OnInit {
  @Input() armorClass: number;
  @Input() weaponProficiencies: string;
  @Input() wealth: number;
  @Input() isEditing: boolean;

  @Output() characterEquipmentFormSubmitted = new EventEmitter<
    CharacterEquipment
  >();
  @Output() characterEquipmentFormEdited = new EventEmitter<
    CharacterEquipment
  >();

  characterEquipmentForm: FormGroup;

  buttonText: string;
  buttonType = 'submit';
  isDisabled: Observable<boolean>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.characterEquipmentForm = this.fb.group({
      armor_class: [
        this.isEditing ? `${this.armorClass}` : '',
        Validators.required,
      ],
      weapon_proficiencies: [
        this.isEditing ? `${this.weaponProficiencies}` : '',
        Validators.required,
      ],
      wealth: [this.isEditing ? `${this.wealth}` : '', Validators.required],
    });

    this.buttonText =
      (this.isEditing ? 'Edit' : 'Create') + ' Character Equipment';
    this.isDisabled = this.characterEquipmentForm.statusChanges.pipe(
      map((changes) => {
        return changes === 'INVALID';
      }),
      startWith(true)
    );
  }

  submitForm(event: Event): void {
    event.preventDefault();

    const { valid, value } = this.characterEquipmentForm;

    if (valid) {
      if (!this.isEditing) {
        this.characterEquipmentFormSubmitted.emit(value);
        this.characterEquipmentForm.reset();
      } else {
        this.characterEquipmentFormEdited.emit(value);
      }
    }
  }
}
