import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetDetailleComponent } from './projet-detaille.component';

describe('ProjetDetailleComponent', () => {
  let component: ProjetDetailleComponent;
  let fixture: ComponentFixture<ProjetDetailleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetDetailleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetDetailleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
