import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserstoryDetailleComponent } from './userstory-detaille.component';

describe('UserstoryDetailleComponent', () => {
  let component: UserstoryDetailleComponent;
  let fixture: ComponentFixture<UserstoryDetailleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserstoryDetailleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstoryDetailleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
