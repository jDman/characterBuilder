import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  OnDestroy,
  ViewContainerRef,
  HostListener,
} from '@angular/core';
import { NgControl } from '@angular/forms';

import { InputErrorHandlerComponent } from '../components/input-error-handler/input-error-handler.component';

@Directive({
  selector: '[appControlErrors]',
})
export class ControlErrorsDirective implements OnDestroy {
  private componentRef: ComponentRef<InputErrorHandlerComponent>;

  @HostListener('input')
  @HostListener('focusout')
  hasErrorsCheck(): void {
    if (this.control.errors) {
      this.componentRef = this.createComponentRef(
        Object.keys(this.control.errors)
      );
    } else if (this.componentRef) {
      this.viewContainer.clear();
      this.componentRef.destroy();
    }
  }

  constructor(
    private control: NgControl,
    private viewContainer: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  createComponentRef(errors): ComponentRef<InputErrorHandlerComponent> {
    this.viewContainer.clear();

    const factory = this.resolver.resolveComponentFactory(
      InputErrorHandlerComponent
    );

    const componentRef = this.viewContainer.createComponent(factory);

    componentRef.instance.errors = errors;

    return componentRef;
  }
}
