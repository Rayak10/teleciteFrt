import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheDetailleComponent } from './tache-detaille.component';

describe('TacheDetailleComponent', () => {
  let component: TacheDetailleComponent;
  let fixture: ComponentFixture<TacheDetailleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacheDetailleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheDetailleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
