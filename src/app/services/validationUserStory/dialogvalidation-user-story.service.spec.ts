import { TestBed } from '@angular/core/testing';

import { DialogvalidationUserStoryService } from './dialogvalidation-user-story.service';

describe('DialogvalidationUserStoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DialogvalidationUserStoryService = TestBed.get(DialogvalidationUserStoryService);
    expect(service).toBeTruthy();
  });
});
