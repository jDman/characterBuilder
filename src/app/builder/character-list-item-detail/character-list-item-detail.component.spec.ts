import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterListItemDetailComponent } from './character-list-item-detail.component';

describe('CharacterListItemDetailComponent', () => {
  let component: CharacterListItemDetailComponent;
  let fixture: ComponentFixture<CharacterListItemDetailComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterListItemDetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterListItemDetailComponent);
    component = fixture.componentInstance;
    component.name = 'Jeff';
    component.background = 'A soldier in the rebel alliance.';
    component.classType = 'warrior';
    component.raceType = 'human';
    component.lastUpdated = '2020-05-07T09:48:28.361Z';
    compiled = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a name', () => {
    expect(
      compiled.querySelector('.character-list-detail__name').textContent
    ).toBe('Jeff');
  });

  it('should display a background', () => {
    expect(
      compiled.querySelector('.character-list-detail__background').textContent
    ).toBe('A soldier in the rebel alliance.');
  });

  it('should display a class', () => {
    expect(
      compiled.querySelector('.character-list-detail__class').textContent
    ).toBe('warrior');
  });

  it('should display a race', () => {
    expect(
      compiled.querySelector('.character-list-detail__race').textContent
    ).toBe('human');
  });
});
