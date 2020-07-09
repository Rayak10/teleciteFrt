import { TestBed } from '@angular/core/testing';

import { ProjetService } from './projet.service';

describe('ProjetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjetService = TestBed.get(ProjetService);
    expect(service).toBeTruthy();
  });
});
