import { TestBed } from '@angular/core/testing';

import { ReunionService } from './reunion.service';

describe('ReunionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReunionService = TestBed.get(ReunionService);
    expect(service).toBeTruthy();
  });
});
