import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherQuestionsComponent } from './teacher-questions.component';

describe('TeacherQuestionsComponent', () => {
  let component: TeacherQuestionsComponent;
  let fixture: ComponentFixture<TeacherQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
