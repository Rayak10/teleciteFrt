import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSprintComponent } from './ajout-sprint.component';

describe('AjoutSprintComponent', () => {
  let component: AjoutSprintComponent;
  let fixture: ComponentFixture<AjoutSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutSprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
