import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserstoryUpdateComponent } from './userstory-update.component';

describe('UserstoryUpdateComponent', () => {
  let component: UserstoryUpdateComponent;
  let fixture: ComponentFixture<UserstoryUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserstoryUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstoryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
