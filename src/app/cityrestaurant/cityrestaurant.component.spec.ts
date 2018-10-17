import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityrestaurantComponent } from './cityrestaurant.component';

describe('CityrestaurantComponent', () => {
  let component: CityrestaurantComponent;
  let fixture: ComponentFixture<CityrestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityrestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityrestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
