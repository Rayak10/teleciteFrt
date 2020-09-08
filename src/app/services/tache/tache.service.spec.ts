import { TestBed } from '@angular/core/testing';

import { TacheService } from './tache.service';

describe('TacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TacheService = TestBed.get(TacheService);
    expect(service).toBeTruthy();
  });
});
