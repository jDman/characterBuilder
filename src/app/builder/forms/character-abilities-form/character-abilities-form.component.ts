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
        Validators.required,
      ],
      constitution: [
        this.isEditing ? `${this.constitution}` : '',
        Validators.required,
      ],
      intelligence: [
        this.isEditing ? `${this.intelligence}` : '',
        Validators.required,
      ],
      wisdom: [this.isEditing ? `${this.wisdom}` : '', Validators.required],
      charisma: [this.isEditing ? `${this.charisma}` : '', Validators.required],
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

        this.characterAbilitiesForm.reset();
      } else {
        this.characterAbilitiesFormEdited.emit(value);
      }
    }
  }
}
