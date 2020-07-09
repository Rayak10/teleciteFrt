import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProjetComponent } from './gestion-projet.component';

describe('GestionProjetComponent', () => {
  let component: GestionProjetComponent;
  let fixture: ComponentFixture<GestionProjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionProjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
