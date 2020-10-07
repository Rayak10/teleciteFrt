import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReunionsComponent } from './list-reunions.component';

describe('ListReunionsComponent', () => {
  let component: ListReunionsComponent;
  let fixture: ComponentFixture<ListReunionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReunionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReunionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
