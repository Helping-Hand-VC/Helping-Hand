import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnFamilyMembersComponent } from './learn-family-members.component';

describe('LearnFamilyMembersComponent', () => {
  let component: LearnFamilyMembersComponent;
  let fixture: ComponentFixture<LearnFamilyMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnFamilyMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnFamilyMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
