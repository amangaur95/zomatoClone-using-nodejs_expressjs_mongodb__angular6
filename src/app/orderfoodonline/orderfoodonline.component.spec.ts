import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderfoodonlineComponent } from './orderfoodonline.component';

describe('OrderfoodonlineComponent', () => {
  let component: OrderfoodonlineComponent;
  let fixture: ComponentFixture<OrderfoodonlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderfoodonlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderfoodonlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
