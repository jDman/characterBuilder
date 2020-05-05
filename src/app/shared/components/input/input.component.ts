import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
  @Input() controlName: string;
  @Input() disabled: boolean;
  @Input() group: FormGroup;
  @Input() name: string;
  @Input() placeholder = '';
  @Input() hasError = false;
  @Input() type: 'text' | 'email' | 'hidden' | 'password';

  control: AbstractControl;

  ngOnInit() {
    this.control = this.group.controls[this.controlName];
  }
}
