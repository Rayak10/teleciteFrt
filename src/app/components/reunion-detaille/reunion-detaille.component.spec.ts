import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionDetailleComponent } from './reunion-detaille.component';

describe('ReunionDetailleComponent', () => {
  let component: ReunionDetailleComponent;
  let fixture: ComponentFixture<ReunionDetailleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReunionDetailleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReunionDetailleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
