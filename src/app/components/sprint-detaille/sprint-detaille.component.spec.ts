import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintDetailleComponent } from './sprint-detaille.component';

describe('SprintDetailleComponent', () => {
  let component: SprintDetailleComponent;
  let fixture: ComponentFixture<SprintDetailleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintDetailleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintDetailleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
