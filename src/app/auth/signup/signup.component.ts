import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  constructor() {}
  formSubmission(event): void {
    console.log(event);
  }
}
