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
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { CharacterTraits } from '../../interfaces/character-traits.interface';
import { isIntegerValidator } from 'src/app/validators/isInteger';

@Component({
  selector: 'app-character-traits-form',
  templateUrl: './character-traits-form.component.html',
  styleUrls: ['./character-traits-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterTraitsFormComponent implements OnInit {
  @Input() abilityScoreIncrease: number;
  @Input() age: number;
  @Input() alignment: string;
  @Input() morality: string;
  @Input() size: string;
  @Input() speed: number;
  @Input() languages: string;
  @Input() isEditing: boolean;

  @Output() characterTraitsFormSubmitted = new EventEmitter<CharacterTraits>();
  @Output() characterTraitsFormEdited = new EventEmitter<CharacterTraits>();

  characterTraitsForm: FormGroup;

  buttonText: string;
  buttonType = 'submit';
  isDisabled: Observable<boolean>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.characterTraitsForm = this.fb.group({
      ability_score_increase: [
        this.isEditing ? `${this.abilityScoreIncrease}` : '',
        [Validators.required, isIntegerValidator()],
      ],
      age: [
        this.isEditing ? `${this.age}` : '',
        [Validators.required, isIntegerValidator()],
      ],
      alignment: [
        this.isEditing ? `${this.alignment}` : '',
        Validators.required,
      ],
      morality: [this.isEditing ? `${this.morality}` : '', Validators.required],
      size: [this.isEditing ? `${this.size}` : '', Validators.required],
      speed: [
        this.isEditing ? `${this.speed}` : '',
        [Validators.required, isIntegerValidator()],
      ],
      languages: [
        this.isEditing ? `${this.languages}` : '',
        Validators.required,
      ],
    });

    this.buttonText =
      (this.isEditing ? 'Edit' : 'Create') + ' Character Traits';
    this.isDisabled = this.characterTraitsForm.statusChanges.pipe(
      map((changes) => {
        return changes === 'INVALID';
      }),
      startWith(true)
    );
  }

  submitForm(event: Event): void {
    event.preventDefault();

    const { valid, value } = this.characterTraitsForm;

    if (valid) {
      if (!this.isEditing) {
        this.characterTraitsFormSubmitted.emit(value);
      } else {
        this.characterTraitsFormEdited.emit(value);
      }
    }
  }
}
