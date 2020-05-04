import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() controlName: string;
  @Input() disabled: boolean;
  @Input() group: FormGroup;
  @Input() label: string;
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'hidden' | 'password';
}
