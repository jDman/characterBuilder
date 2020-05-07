import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CharacterBase } from '../../interfaces/character-base.interface';

@Component({
  selector: 'app-character-base-form',
  templateUrl: './character-base-form.component.html',
  styleUrls: ['./character-base-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterBaseFormComponent implements OnInit {
  @Output() characterBaseFormSubmitted = new EventEmitter<CharacterBase>();

  characterBaseForm = this.fb.group({
    name: ['', Validators.required],
    background: ['', Validators.required],
    additional_info: ['', Validators.maxLength(4000)],
    classType: ['', Validators.required],
    raceType: ['', Validators.required],
  });

  buttonText = 'Create Character';
  buttonType = 'submit';
  isDisabled: Observable<boolean>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isDisabled = this.characterBaseForm.statusChanges.pipe(
      map((changes) => {
        return changes === 'INVALID';
      }),
      startWith(true)
    );
  }

  create(event: Event): void {
    event.preventDefault();

    if (this.characterBaseForm.valid) {
      this.characterBaseFormSubmitted.emit(this.characterBaseForm.value);
    }
  }
}
