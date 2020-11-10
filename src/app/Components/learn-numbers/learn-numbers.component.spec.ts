import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnNumbersComponent } from './learn-numbers.component';

describe('LearnNumbersComponent', () => {
  let component: LearnNumbersComponent;
  let fixture: ComponentFixture<LearnNumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnNumbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
