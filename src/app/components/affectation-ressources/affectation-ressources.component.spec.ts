import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationRessourcesComponent } from './affectation-ressources.component';

describe('AffectationRessourcesComponent', () => {
  let component: AffectationRessourcesComponent;
  let fixture: ComponentFixture<AffectationRessourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectationRessourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationRessourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
