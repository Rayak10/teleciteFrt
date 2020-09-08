import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTacheComponent } from './gestion-tache.component';

describe('GestionTacheComponent', () => {
  let component: GestionTacheComponent;
  let fixture: ComponentFixture<GestionTacheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionTacheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
