import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeUpdatComponent } from './employe-updat.component';

describe('EmployeUpdatComponent', () => {
  let component: EmployeUpdatComponent;
  let fixture: ComponentFixture<EmployeUpdatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeUpdatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeUpdatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
