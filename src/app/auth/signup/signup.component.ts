import { Component, ChangeDetectionStrategy } from '@angular/core';
import { take } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';
import { SignupFormValue } from '../interfaces/signup-form-value.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  constructor(private authService: AuthService) {}

  formSubmission(value: SignupFormValue): void {
    this.authService.signup(value).pipe(take(1)).subscribe();
  }
}
