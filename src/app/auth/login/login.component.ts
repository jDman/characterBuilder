import { Component, ChangeDetectionStrategy } from '@angular/core';
import { take } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';
import { LoginFormValue } from '../interfaces/login-form-value.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  formSubmission(value: LoginFormValue): void {
    this.authService
      .login(value)
      .pipe(take(1))
      .subscribe(({ token, userId }) => {
        const remainingMilliseconds = 60 * 60 * 1000;

        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );

        this.authService.setAuthSessionItems(
          sessionStorage,
          token,
          expiryDate,
          userId
        );
        this.authService.updateIsAuth(true);

        this.router.navigate(['/']);
      });
  }
}
