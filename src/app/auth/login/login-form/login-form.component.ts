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

import { LoginFormValue } from '../../interfaces/login-form-value.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  @Output() loginFormSubmitted = new EventEmitter<LoginFormValue>();

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  buttonText = 'Login';
  buttonType = 'submit';

  isDisabled: Observable<boolean>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isDisabled = this.loginForm.statusChanges.pipe(
      map((changes) => {
        return changes === 'INVALID';
      }),
      startWith(true)
    );
  }

  login(event: Event): void {
    event.preventDefault();
    if (this.loginForm.valid) {
      this.loginFormSubmitted.emit(this.loginForm.value);
    }
  }
}
