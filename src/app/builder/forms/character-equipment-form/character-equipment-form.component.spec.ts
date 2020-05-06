import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterEquipmentFormComponent } from './character-equipment-form.component';

describe('CharacterEquipmentFormComponent', () => {
  let component: CharacterEquipmentFormComponent;
  let fixture: ComponentFixture<CharacterEquipmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterEquipmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterEquipmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
