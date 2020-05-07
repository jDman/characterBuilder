import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SelectComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    component.group = new FormGroup({ test: new FormControl() });
    component.name = 'test';
    component.controlName = 'test';
    component.options = [
      {
        label: 'test',
        value: 'test',
      },
      {
        label: 'magic',
        value: 'magic',
      },
    ];
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create and set initial current selection', () => {
    expect(component.currentSelection.value).toBe('test');
  });

  it('should switch isOpen property to hide a list of options when click registered outside control', () => {
    component.displayOptions();

    fixture.detectChanges();

    compiled.querySelector('.select-label').click();

    fixture.detectChanges();

    const optionElems = compiled.querySelectorAll('.select-control__list-item');

    expect(optionElems.length).toBe(0);
  });

  describe('displayOptions', () => {
    it('should switch isOpen property to display a list of options', () => {
      component.displayOptions();

      fixture.detectChanges();

      const optionElems = compiled.querySelectorAll(
        '.select-control__list-item'
      );

      expect(optionElems[0].textContent.trim()).toBe('test');
      expect(optionElems[1].textContent.trim()).toBe('magic');
    });
  });

  describe('selectedOption', () => {
    it('should update the current selection', () => {
      component.selectedOption({
        label: 'magic',
        value: 'magic',
      });

      fixture.detectChanges();

      expect(component.currentSelection.value).toBe('magic');
    });
  });
});
