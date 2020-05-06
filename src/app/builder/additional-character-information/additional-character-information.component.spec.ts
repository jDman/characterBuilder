import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalCharacterInformationComponent } from './additional-character-information.component';

describe('AdditionalCharacterInformationComponent', () => {
  let component: AdditionalCharacterInformationComponent;
  let fixture: ComponentFixture<AdditionalCharacterInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalCharacterInformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalCharacterInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and set component selection property to default abilities', () => {
    expect(component.selection).toBe('abilities');
  });

  describe('updateSelection', () => {
    it('should update component selection property to passed in option string, lower casing it', () => {
      const option = 'Traits';

      component.updateSelection(option);

      expect(component.selection).toBe('traits');
    });
  });
});
