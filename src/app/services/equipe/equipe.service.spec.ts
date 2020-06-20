import { TestBed } from '@angular/core/testing';

import { EquipeService } from './equipe.service';

describe('EquipeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EquipeService = TestBed.get(EquipeService);
    expect(service).toBeTruthy();
  });
});
