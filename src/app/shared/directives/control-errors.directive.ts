import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  OnInit,
  OnDestroy,
  ViewContainerRef,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { InputErrorHandlerComponent } from '../components/input-error-handler/input-error-handler.component';

@Directive({
  selector: '[appControlErrors]',
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private componentRef: ComponentRef<InputErrorHandlerComponent>;

  constructor(
    private control: NgControl,
    private viewContainer: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.control.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        if (this.control.errors) {
          this.componentRef = this.createComponentRef(
            Object.keys(this.control.errors)
          );
        } else if (this.componentRef) {
          this.viewContainer.clear();
          this.componentRef.destroy();
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

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
