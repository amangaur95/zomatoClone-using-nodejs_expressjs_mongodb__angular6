import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisinelistComponent } from './cuisinelist.component';

describe('CuisinelistComponent', () => {
  let component: CuisinelistComponent;
  let fixture: ComponentFixture<CuisinelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuisinelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuisinelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
