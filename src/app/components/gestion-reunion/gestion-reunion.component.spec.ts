import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionReunionComponent } from './gestion-reunion.component';

describe('GestionReunionComponent', () => {
  let component: GestionReunionComponent;
  let fixture: ComponentFixture<GestionReunionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionReunionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
