import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationSprintComponent } from './validation-sprint.component';

describe('ValidationSprintComponent', () => {
  let component: ValidationSprintComponent;
  let fixture: ComponentFixture<ValidationSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationSprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
