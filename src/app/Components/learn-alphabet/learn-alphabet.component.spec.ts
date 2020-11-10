import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnAlphabetComponent } from './learn-alphabet.component';

describe('LearnAlphabetComponent', () => {
  let component: LearnAlphabetComponent;
  let fixture: ComponentFixture<LearnAlphabetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnAlphabetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnAlphabetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
