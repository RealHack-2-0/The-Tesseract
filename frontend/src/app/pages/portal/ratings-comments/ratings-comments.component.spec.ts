import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsCommentsComponent } from './ratings-comments.component';

describe('RatingsCommentsComponent', () => {
  let component: RatingsCommentsComponent;
  let fixture: ComponentFixture<RatingsCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingsCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
