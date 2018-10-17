import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmenupageComponent } from './editmenupage.component';

describe('EditmenupageComponent', () => {
  let component: EditmenupageComponent;
  let fixture: ComponentFixture<EditmenupageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmenupageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmenupageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
