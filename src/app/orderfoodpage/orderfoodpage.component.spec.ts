import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderfoodpageComponent } from './orderfoodpage.component';

describe('OrderfoodpageComponent', () => {
  let component: OrderfoodpageComponent;
  let fixture: ComponentFixture<OrderfoodpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderfoodpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderfoodpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
