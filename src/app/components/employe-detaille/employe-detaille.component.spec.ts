import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeDetailleComponent } from './employe-detaille.component';

describe('EmployeDetailleComponent', () => {
  let component: EmployeDetailleComponent;
  let fixture: ComponentFixture<EmployeDetailleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeDetailleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeDetailleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
