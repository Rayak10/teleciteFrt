import { TestBed } from '@angular/core/testing';

import { DatapassService } from './datapass.service';

describe('DatapassService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatapassService = TestBed.get(DatapassService);
    expect(service).toBeTruthy();
  });
});
