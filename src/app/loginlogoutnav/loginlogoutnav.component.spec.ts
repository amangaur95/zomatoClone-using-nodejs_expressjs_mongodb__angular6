import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginlogoutnavComponent } from './loginlogoutnav.component';

describe('LoginlogoutnavComponent', () => {
  let component: LoginlogoutnavComponent;
  let fixture: ComponentFixture<LoginlogoutnavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginlogoutnavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginlogoutnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
