import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintUpdateComponent } from './sprint-update.component';

describe('SprintUpdateComponent', () => {
  let component: SprintUpdateComponent;
  let fixture: ComponentFixture<SprintUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
