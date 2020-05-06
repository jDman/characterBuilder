import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterBaseFormComponent } from './character-base-form.component';

describe('CharacterBaseFormComponent', () => {
  let component: CharacterBaseFormComponent;
  let fixture: ComponentFixture<CharacterBaseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterBaseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterBaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
