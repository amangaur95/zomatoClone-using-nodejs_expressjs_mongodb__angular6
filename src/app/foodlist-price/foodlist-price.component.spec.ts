import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodlistPriceComponent } from './foodlist-price.component';

describe('FoodlistPriceComponent', () => {
  let component: FoodlistPriceComponent;
  let fixture: ComponentFixture<FoodlistPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodlistPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodlistPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
