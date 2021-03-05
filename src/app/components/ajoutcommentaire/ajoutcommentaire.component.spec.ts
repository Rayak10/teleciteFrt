import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutcommentaireComponent } from './ajoutcommentaire.component';

describe('AjoutcommentaireComponent', () => {
  let component: AjoutcommentaireComponent;
  let fixture: ComponentFixture<AjoutcommentaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutcommentaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutcommentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
