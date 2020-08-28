import { TestBed } from '@angular/core/testing';

import { UserstoryService } from './userstory.service';

describe('UserstoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserstoryService = TestBed.get(UserstoryService);
    expect(service).toBeTruthy();
  });
});
