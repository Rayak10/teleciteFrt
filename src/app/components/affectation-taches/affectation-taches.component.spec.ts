import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationTachesComponent } from './affectation-taches.component';

describe('AffectationTachesComponent', () => {
  let component: AffectationTachesComponent;
  let fixture: ComponentFixture<AffectationTachesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectationTachesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationTachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
