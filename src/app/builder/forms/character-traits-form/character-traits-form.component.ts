import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';

import { CharacterTraits } from '../../interfaces/character-traits.interface';

@Component({
  selector: 'app-character-traits-form',
  templateUrl: './character-traits-form.component.html',
  styleUrls: ['./character-traits-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterTraitsFormComponent implements OnInit {
  @Output() characterTraitsFormSubmitted = new EventEmitter<CharacterTraits>();

  characterTraitsForm = this.fb.group({
    ability_score_increase: ['', Validators.required],
    age: ['', Validators.required],
    alignment: ['', Validators.required],
    morality: ['', Validators.required],
    size: ['', Validators.required],
    speed: ['', Validators.required],
    languages: ['', Validators.required],
  });

  buttonText = 'Create Character Traits';
  buttonType = 'submit';
  isDisabled: Observable<boolean>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isDisabled = this.characterTraitsForm.statusChanges.pipe(
      map((changes) => {
        return changes === 'INVALID';
      }),
      startWith(true)
    );
  }

  create(event: Event): void {
    event.preventDefault();

    const { valid, value } = this.characterTraitsForm;

    if (valid) {
      this.characterTraitsFormSubmitted.emit(value);
    }
  }
}
