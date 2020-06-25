import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionComptesComponent } from './gestion-comptes.component';

describe('GestionComptesComponent', () => {
  let component: GestionComptesComponent;
  let fixture: ComponentFixture<GestionComptesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionComptesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionComptesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
