import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheUpdateComponent } from './tache-update.component';

describe('TacheUpdateComponent', () => {
  let component: TacheUpdateComponent;
  let fixture: ComponentFixture<TacheUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacheUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
