import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductbusinessComponent } from './productbusiness.component';

describe('ProductbusinessComponent', () => {
  let component: ProductbusinessComponent;
  let fixture: ComponentFixture<ProductbusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductbusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductbusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
