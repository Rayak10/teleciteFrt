import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionUserstoryComponent } from './gestion-userstory.component';

describe('GestionUserstoryComponent', () => {
  let component: GestionUserstoryComponent;
  let fixture: ComponentFixture<GestionUserstoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionUserstoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionUserstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
