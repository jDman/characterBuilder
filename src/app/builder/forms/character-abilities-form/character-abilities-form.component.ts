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

import { CharacterAbilities } from '../../interfaces/character-abilities.interface';

@Component({
  selector: 'app-character-abilities-form',
  templateUrl: './character-abilities-form.component.html',
  styleUrls: ['./character-abilities-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterAbilitiesFormComponent implements OnInit {
  @Output() characterAbilitiesFormSubmitted = new EventEmitter<
    CharacterAbilities
  >();

  characterAbilitiesForm = this.fb.group({
    strength: ['', Validators.required],
    dexterity: ['', Validators.required],
    constitution: ['', Validators.required],
    intelligence: ['', Validators.required],
    wisdom: ['', Validators.required],
    charisma: ['', Validators.required],
  });

  buttonText = 'Create Character Abilities';
  buttonType = 'submit';
  isDisabled: Observable<boolean>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isDisabled = this.characterAbilitiesForm.statusChanges.pipe(
      map((changes) => {
        return changes === 'INVALID';
      }),
      startWith(true)
    );
  }

  create(event: Event): void {
    event.preventDefault();

    const { valid, value } = this.characterAbilitiesForm;

    if (valid) {
      this.characterAbilitiesFormSubmitted.emit(value);
      this.characterAbilitiesForm.reset();
    }
  }
}
