import { TestBed } from '@angular/core/testing';

import { ProspectionService } from './prospection.service';

describe('ProspectionService', () => {
  let service: ProspectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProspectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
