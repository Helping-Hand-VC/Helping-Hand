import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LodaingPageComponent } from './lodaing-page.component';

describe('LodaingPageComponent', () => {
  let component: LodaingPageComponent;
  let fixture: ComponentFixture<LodaingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LodaingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LodaingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
