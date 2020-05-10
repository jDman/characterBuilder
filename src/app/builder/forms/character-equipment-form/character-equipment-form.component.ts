import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CharacterEquipment } from '../../interfaces/character-equipment.interface';

@Component({
  selector: 'app-character-equipment-form',
  templateUrl: './character-equipment-form.component.html',
  styleUrls: ['./character-equipment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterEquipmentFormComponent implements OnInit {
  @Output() characterEquipmentFormSubmitted = new EventEmitter<
    CharacterEquipment
  >();

  characterEquipmentForm = this.fb.group({
    armor_class: ['', Validators.required],
    weapon_proficiencies: ['', Validators.required],
    wealth: ['', Validators.required],
  });

  buttonText = 'Create Character Equipment';
  buttonType = 'submit';
  isDisabled: Observable<boolean>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isDisabled = this.characterEquipmentForm.statusChanges.pipe(
      map((changes) => {
        return changes === 'INVALID';
      }),
      startWith(true)
    );
  }

  create(event: Event): void {
    event.preventDefault();

    const { valid, value } = this.characterEquipmentForm;

    if (valid) {
      this.characterEquipmentFormSubmitted.emit(value);
      this.characterEquipmentForm.reset();
    }
  }
}
