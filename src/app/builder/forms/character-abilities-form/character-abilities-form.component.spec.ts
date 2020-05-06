import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAbilitiesFormComponent } from './character-abilities-form.component';

describe('CharacterAbilitiesFormComponent', () => {
  let component: CharacterAbilitiesFormComponent;
  let fixture: ComponentFixture<CharacterAbilitiesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterAbilitiesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterAbilitiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
