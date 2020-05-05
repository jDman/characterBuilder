import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-input-error-handler',
  templateUrl: './input-error-handler.component.html',
  styleUrls: ['./input-error-handler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputErrorHandlerComponent {
  @Input() errors: Array<string>;
}
