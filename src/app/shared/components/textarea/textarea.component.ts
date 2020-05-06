import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent implements OnInit {
  @Input() controlName: string;
  @Input() disabled: boolean;
  @Input() group: FormGroup;
  @Input() name: string;
  @Input() placeholder = '';
  @Input() readonly = false;
  @Input() required = false;
  @Input() wrap: 'soft' | 'hard' | 'off' = 'soft';
  @Input() hasError = false;
  @Input() cols = 10;
  @Input() rows = 10;

  control: AbstractControl;

  ngOnInit() {
    this.control = this.group.controls[this.controlName];
  }
}
