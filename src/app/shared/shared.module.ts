import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { ControlErrorsDirective } from './directives/control-errors.directive';
import { InputErrorHandlerComponent } from './components/input-error-handler/input-error-handler.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { SelectComponent } from './components/select/select.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    ControlErrorsDirective,
    InputErrorHandlerComponent,
    TextareaComponent,
    SelectComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    InputErrorHandlerComponent,
    TextareaComponent,
    SelectComponent,
  ],
})
export class SharedModule {}
