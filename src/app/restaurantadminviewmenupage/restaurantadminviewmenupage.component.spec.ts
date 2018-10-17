import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantadminviewmenupageComponent } from './restaurantadminviewmenupage.component';

describe('RestaurantadminviewmenupageComponent', () => {
  let component: RestaurantadminviewmenupageComponent;
  let fixture: ComponentFixture<RestaurantadminviewmenupageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantadminviewmenupageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantadminviewmenupageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
