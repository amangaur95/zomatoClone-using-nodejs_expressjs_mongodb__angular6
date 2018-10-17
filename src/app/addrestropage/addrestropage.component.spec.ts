import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrestropageComponent } from './addrestropage.component';

describe('AddrestropageComponent', () => {
  let component: AddrestropageComponent;
  let fixture: ComponentFixture<AddrestropageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrestropageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrestropageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
