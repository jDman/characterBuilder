import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterTraitsFormComponent } from './character-traits-form.component';

describe('CharacterTraitsFormComponent', () => {
  let component: CharacterTraitsFormComponent;
  let fixture: ComponentFixture<CharacterTraitsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterTraitsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterTraitsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
