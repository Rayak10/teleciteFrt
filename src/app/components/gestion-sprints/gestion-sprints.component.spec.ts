import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSprintsComponent } from './gestion-sprints.component';

describe('GestionSprintsComponent', () => {
  let component: GestionSprintsComponent;
  let fixture: ComponentFixture<GestionSprintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionSprintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionSprintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
