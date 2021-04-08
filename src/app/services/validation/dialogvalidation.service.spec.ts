import { TestBed } from '@angular/core/testing';

import { DialogvalidationService } from './dialogvalidation.service';

describe('DialogvalidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DialogvalidationService = TestBed.get(DialogvalidationService);
    expect(service).toBeTruthy();
  });
});
