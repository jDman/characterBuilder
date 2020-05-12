import { Component, ChangeDetectionStrategy } from '@angular/core';
import { take } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';
import { LoginFormValue } from '../interfaces/login-form-value.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  formSubmission(value: LoginFormValue): void {
    this.authService.login(value).pipe(take(1)).subscribe();
  }
}
