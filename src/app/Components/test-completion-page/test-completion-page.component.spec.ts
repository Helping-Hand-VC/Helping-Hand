import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCompletionPageComponent } from './test-completion-page.component';

describe('TestCompletionPageComponent', () => {
  let component: TestCompletionPageComponent;
  let fixture: ComponentFixture<TestCompletionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCompletionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCompletionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
