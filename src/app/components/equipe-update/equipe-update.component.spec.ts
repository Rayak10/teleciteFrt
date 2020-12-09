import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeUpdateComponent } from './equipe-update.component';

describe('EquipeUpdateComponent', () => {
  let component: EquipeUpdateComponent;
  let fixture: ComponentFixture<EquipeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
