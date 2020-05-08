import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterInformationTerminalComponent } from './character-information-terminal.component';

describe('CharacterInformationTerminalComponent', () => {
  let component: CharacterInformationTerminalComponent;
  let fixture: ComponentFixture<CharacterInformationTerminalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterInformationTerminalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterInformationTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
