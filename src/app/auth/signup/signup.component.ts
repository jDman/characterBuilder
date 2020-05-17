import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';
import { SignupFormValue } from '../interfaces/signup-form-value.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.fetchCookie();
  }

  formSubmission(value: SignupFormValue): void {
    this.authService.signup(value).pipe(take(1)).subscribe();
  }
}
