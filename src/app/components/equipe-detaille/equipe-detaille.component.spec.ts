import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeDetailleComponent } from './equipe-detaille.component';

describe('EquipeDetailleComponent', () => {
  let component: EquipeDetailleComponent;
  let fixture: ComponentFixture<EquipeDetailleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipeDetailleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipeDetailleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
