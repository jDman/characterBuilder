import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface SignupFormValue {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupFormComponent implements OnInit {
  @Output() signupFormSubmitted = new EventEmitter<SignupFormValue>();

  signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  buttonText = 'Signup';
  buttonType = 'submit';
  isDisabled: Observable<boolean>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isDisabled = this.signupForm.statusChanges.pipe(
      map((changes) => {
        return changes === 'INVALID';
      }),
      startWith(true)
    );
  }

  signup(event: Event): void {
    event.preventDefault();
    if (this.signupForm.valid) {
      this.signupFormSubmitted.emit(this.signupForm.value);
    }
  }
}
