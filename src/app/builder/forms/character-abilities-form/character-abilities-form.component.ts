import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { CharacterAbilities } from '../../interfaces/character-abilities.interface';
import { isIntegerValidator } from 'src/app/validators/isInteger';

@Component({
  selector: 'app-character-abilities-form',
  templateUrl: './character-abilities-form.component.html',
  styleUrls: ['./character-abilities-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterAbilitiesFormComponent implements OnInit {
  @Input() strength: number;
  @Input() dexterity: number;
  @Input() constitution: number;
  @Input() intelligence: number;
  @Input() wisdom: number;
  @Input() charisma: number;
  @Input() isEditing: boolean;

  @Output() characterAbilitiesFormSubmitted = new EventEmitter<
    CharacterAbilities
  >();
  @Output() characterAbilitiesFormEdited = new EventEmitter<
    CharacterAbilities
  >();

  characterAbilitiesForm: FormGroup;
  buttonText: string;
  buttonType = 'submit';
  isDisabled: Observable<boolean>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.characterAbilitiesForm = this.fb.group({
      strength: [this.isEditing ? `${this.strength}` : '', Validators.required],
      dexterity: [
        this.isEditing ? `${this.dexterity}` : '',
        [Validators.required, isIntegerValidator()],
      ],
      constitution: [
        this.isEditing ? `${this.constitution}` : '',
        [Validators.required, isIntegerValidator()],
      ],
      intelligence: [
        this.isEditing ? `${this.intelligence}` : '',
        [Validators.required, isIntegerValidator()],
      ],
      wisdom: [
        this.isEditing ? `${this.wisdom}` : '',
        [Validators.required, isIntegerValidator()],
      ],
      charisma: [
        this.isEditing ? `${this.charisma}` : '',
        [Validators.required, isIntegerValidator()],
      ],
    });

    this.buttonText =
      (this.isEditing ? 'Edit' : 'Create') + ' Character Abilities';
    this.isDisabled = this.characterAbilitiesForm.statusChanges.pipe(
      map((changes) => {
        return changes === 'INVALID';
      }),
      startWith(!this.isEditing)
    );
  }

  submitForm(event: Event): void {
    event.preventDefault();

    const { valid, value } = this.characterAbilitiesForm;

    if (valid) {
      if (!this.isEditing) {
        this.characterAbilitiesFormSubmitted.emit(value);
      } else {
        this.characterAbilitiesFormEdited.emit(value);
      }
    }
  }
}
