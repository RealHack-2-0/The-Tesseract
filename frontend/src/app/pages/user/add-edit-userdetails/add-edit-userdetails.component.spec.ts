import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUserdetailsComponent } from './add-edit-userdetails.component';

describe('AddEditUserdetailsComponent', () => {
  let component: AddEditUserdetailsComponent;
  let fixture: ComponentFixture<AddEditUserdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditUserdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditUserdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
