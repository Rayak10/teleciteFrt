import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionUpdateComponent } from './reunion-update.component';

describe('ReunionUpdateComponent', () => {
  let component: ReunionUpdateComponent;
  let fixture: ComponentFixture<ReunionUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReunionUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReunionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
