import { TestBed } from '@angular/core/testing';

import { DepartementService } from './departement.service';

describe('DepartementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepartementService = TestBed.get(DepartementService);
    expect(service).toBeTruthy();
  });
});
