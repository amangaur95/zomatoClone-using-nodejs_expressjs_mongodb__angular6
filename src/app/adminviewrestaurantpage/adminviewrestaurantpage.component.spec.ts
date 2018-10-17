import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminviewrestaurantpageComponent } from './adminviewrestaurantpage.component';

describe('AdminviewrestaurantpageComponent', () => {
  let component: AdminviewrestaurantpageComponent;
  let fixture: ComponentFixture<AdminviewrestaurantpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminviewrestaurantpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminviewrestaurantpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
