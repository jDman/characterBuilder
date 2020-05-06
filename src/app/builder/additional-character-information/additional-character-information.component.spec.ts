import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalCharacterInformationComponent } from './additional-character-information.component';

describe('AdditionalCharacterInformationComponent', () => {
  let component: AdditionalCharacterInformationComponent;
  let fixture: ComponentFixture<AdditionalCharacterInformationComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalCharacterInformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalCharacterInformationComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create and set component selection property to default abilities', () => {
    expect(component.selection).toBe('abilities');
  });

  it('should have three selection options in the terminal with correct text content', () => {
    const selectionList = compiled.querySelectorAll(
      '.additional-character-information__selection'
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
