import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallRatingComponent } from './overall-rating.component';

describe('OverallRatingComponent', () => {
  let component: OverallRatingComponent;
  let fixture: ComponentFixture<OverallRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
