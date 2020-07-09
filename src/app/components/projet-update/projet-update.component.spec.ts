import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetUpdateComponent } from './projet-update.component';

describe('ProjetUpdateComponent', () => {
  let component: ProjetUpdateComponent;
  let fixture: ComponentFixture<ProjetUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
