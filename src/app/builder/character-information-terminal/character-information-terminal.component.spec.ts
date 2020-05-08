import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterInformationTerminalComponent } from './character-information-terminal.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CharacterInformationTerminalComponent', () => {
  let component: CharacterInformationTerminalComponent;
  let fixture: ComponentFixture<CharacterInformationTerminalComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterInformationTerminalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterInformationTerminalComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create and set component selection property to default abilities', () => {
    expect(component.selection).toBe('abilities');
  });

  it('should have three selection options in the terminal with correct text content', () => {
    const selectionList = compiled.querySelectorAll(
      '.character-information-terminal__selection'
    );
    expect(selectionList[0].textContent).toBe('Abilities');
    expect(selectionList[1].textContent).toBe('Equipment');
    expect(selectionList[2].textContent).toBe('Traits');
  });

  describe('updateSelection', () => {
    it('should update component selection property to passed in option string, lower casing it', () => {
      const option = 'Traits';

      component.updateSelection(option);

      expect(component.selection).toBe('traits');
    });
  });
});
