import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredWelcomeScreenComponent } from './registered-welcome-screen.component';

describe('RegisteredWelcomeScreenComponent', () => {
  let component: RegisteredWelcomeScreenComponent;
  let fixture: ComponentFixture<RegisteredWelcomeScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredWelcomeScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredWelcomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
