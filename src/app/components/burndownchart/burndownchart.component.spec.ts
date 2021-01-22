import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurndownchartComponent } from './burndownchart.component';

describe('BurndownchartComponent', () => {
  let component: BurndownchartComponent;
  let fixture: ComponentFixture<BurndownchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurndownchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurndownchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
