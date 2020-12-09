import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEquipeComponent } from './gestion-equipe.component';

describe('GestionEquipeComponent', () => {
  let component: GestionEquipeComponent;
  let fixture: ComponentFixture<GestionEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
