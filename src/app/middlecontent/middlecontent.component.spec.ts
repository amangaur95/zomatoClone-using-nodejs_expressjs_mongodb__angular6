import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddlecontentComponent } from './middlecontent.component';

describe('MiddlecontentComponent', () => {
  let component: MiddlecontentComponent;
  let fixture: ComponentFixture<MiddlecontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddlecontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddlecontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
