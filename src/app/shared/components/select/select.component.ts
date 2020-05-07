import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface CustomSelectOption {
  value: any;
  label: string;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('selectControl') selectControlRef: ElementRef;
  @ViewChild('selectOption') selectOptionRef: ElementRef;

  @Input() controlName: string;
  @Input() disabled: boolean;
  @Input() group: FormGroup;
  @Input() name: string;
  @Input() options: Array<CustomSelectOption> = [];
  @Input() initialSelectionIndex = 0;
  @Input() readonly = false;
  @Input() required = false;
  @Input() hasError = false;

  private unsubscribe$ = new Subject<void>();

  control: AbstractControl;
  currentSelection: CustomSelectOption;
  isOpen = false;

  @HostListener('document:click', ['$event'])
  outsideComponentCheck(event: MouseEvent) {
    const { clientX, clientY } = event;

    const {
      top,
      left,
      right,
      bottom,
    } = this.selectControlRef.nativeElement.getBoundingClientRect();

    if (
      (clientX <= Math.floor(left) ||
        clientX >= Math.floor(right) ||
        clientY <= Math.floor(top) ||
        clientY >= Math.floor(bottom)) &&
      this.isOpen === true
    ) {
      this.displayOptions();
    }
  }

  ngOnInit(): void {
    this.control = this.group.controls[this.controlName];
    this.currentSelection = { ...this.options[this.initialSelectionIndex] };
  }

  ngAfterViewInit() {
    this.control.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        const event = new Event('onchange', {
          bubbles: true,
          cancelable: true,
        });

        this.selectOptionRef.nativeElement.dispatchEvent(event);
      });

    this.control.setValue(this.currentSelection.value);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  displayOptions() {
    this.isOpen = !this.isOpen;
  }

  selectedOption(option: any): void {
    this.currentSelection = { ...option };
    this.control.setValue(this.currentSelection.value);

    this.displayOptions();
  }
}
