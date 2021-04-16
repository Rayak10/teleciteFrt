import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationUserStoryComponent } from './validation-user-story.component';

describe('ValidationUserStoryComponent', () => {
  let component: ValidationUserStoryComponent;
  let fixture: ComponentFixture<ValidationUserStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationUserStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationUserStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
